import React, { useState } from 'react';
import axios from 'axios';
import Upload from '@/components/Utility/Upload'
import { getXataClient } from '@/xata.server'
import { ActionFunctionArgs, json, redirect } from '@remix-run/node'
import { Form, Link, useActionData, useLoaderData } from '@remix-run/react'
import Image from '@/components/Utility/Image'

export async function loader() {
    const xata = getXataClient()
    // Use the Xata client to fetch all content from the database for the table: 'content'
    return await xata.db.content.getAll()
}

export async function action({ request }: ActionFunctionArgs) {
const body = await request.formData()
const search = body.get('search') as string
// If the 'search' parameter is missing, redirect to '/content'
if (!search) return redirect('/content')
const xata = getXataClient()
// Use the Xata client to perform a search across specified tables with fuzziness
const { records } = await xata.search.all(search, {
    tables: [
    {
        table: 'content',
        target: ['content', 'title', 'slug', 'company'],
    },
    ],
    fuzziness: 2,
})
// Extract the 'record' property from each search result containing the content
const result = records.map((i) => i.record)
return json({ search, result })
}
  

const UploadForm = () => {
  const [file, setFile] = useState(null);
  const [responseMessage, setResponseMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
        const formData = new FormData();
        formData.append('file', file, 'cv.pdf'); // Ensure 'file' matches the key expected by the server
        formData.append('type', 'application/pdf'); // Add additional information about the file type
      
        const response = await axios.post('https://resume-parser-7s46.onrender.com/analyze-cv/', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
      
        setResponseMessage(response.data.responseText);
      } catch (error) {
        console.error('Error uploading file:', error);
        setResponseMessage('Error: Unable to upload file.');
      } finally {
        setLoading(false); // Stop loading indicator
      }
  };
  const images = useLoaderData<typeof loader>()
  const actionData = useActionData<typeof action>()
  const rel = ['google-b640', 'bmwgroup-de7a', 'google-3265']
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <br />
      <span className="text-2xl font-semibold">Upload your CV</span>
      <br /> <br />
         <span className="mt-8 font-medium">Upload PDF</span>
        <br /> <br />
        <input type="file" onChange={handleFileChange} accept=".pdf" />
        <br /> <br />
        <button type="submit" className="bg-white hover:bg-black text-black hover:text-white px-3 border border-black py-1 rounded max-w-max">Upload</button>
      </form>
      <br /> 
      {loading && <p>Loading...</p>} {/* Display loading indicator */}
      {responseMessage && (
        <div>
          {/* <h2>Response:</h2> */}
          {/* <p>{responseMessage}</p> */}
          <p>Based on the resume, following jobs matches your profile:</p>

          <br />
          {(actionData?.result || images)
        .filter((i) => i.slug && rel.includes(i.slug))
        .sort((a, b) => (a.xata.createdAt < b.xata.createdAt ? 1 : -1))
        .map((i, _: number) => (
          <Link className="relative mt-8" target='_blank' key={i.slug} to={'/content/' + i.slug}>
            <div className="max-w-[800px] border border-gray-200 rounded px-3 py-1 bottom-4 left-4 flex flex-row items-center min-h-[20px] gap-x-10 z-20">
              <Image alt={i.company} url={i.author_image_url} width={i.author_image_w} height={i.author_image_h} className="h-[100px] w-[100px] rounded-full" />
              <div>
                <span><strong>{i.title}</strong></span> 
                <br />
                <span>{i.company}</span> 
                <br />
                <span className="text-gray-500">{i.location}</span>
                <br />
                <span className="text-gray-500">{i.experience_level} - {i.job_type}</span> 
                <br />
                <span className="text-gray-500">Posted On: {new Date(i.xata.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
            <br />
          </Link>
        ))}
        </div>
      )}
    </div>
  );
};

export default UploadForm;


