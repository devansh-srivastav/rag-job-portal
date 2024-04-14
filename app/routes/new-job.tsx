import { Editor } from 'novel'
import { Form } from '@remix-run/react'
import { getXataClient } from '@/xata.server'
import Upload from '@/components/Utility/Upload'
import { ActionFunctionArgs, json, redirect } from '@remix-run/node'
import { randomBytes } from 'crypto';
import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config(); // Load environment variables from .env file

const VECTARA_CUSTOMER_ID = process.env.VECTARA_CUSTOMER_ID || '';
const VECTARA_CORPUS_ID = "4";
const VECTARA_API_KEY = process.env.VECTARA_API_KEY || '';
const VECTARA_INDEXING_URL = "https://api.vectara.io/v1/index";



interface EventData {
    title: string;
    content: string;
    location: string;
    company: string;
    apply_url: string;
    experience_level: string;
    job_type: string;
    slug: string;
}

async function sendToVectara(data: EventData): Promise<void> {
    // Construct the document payload for Vectara Indexing API
    const document = {
        customerId: VECTARA_CUSTOMER_ID,
        corpusId: VECTARA_CORPUS_ID,
        document: {
            documentId: data.slug,
            title: data.title,
            description: data.content,
            metadataJson: JSON.stringify({
                company: data.company,
                location: data.location,
                experience_level: data.experience_level,
                job_type: data.job_type,
                link: data.apply_url,
                date_posted: new Date().toLocaleDateString()
            })
        }
    };

    try {
        // Send the document to Vectara for indexing
        const response = await axios.post(
            VECTARA_INDEXING_URL,
            document,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'x-api-key': VECTARA_API_KEY
                }
            }
        );

        if (response.status === 200) {
            console.log("Successfully indexed the job posting to Vectara.");
        } else {
            console.log(`Failed to index the job posting to Vectara: ${response.data}`);
        }
    } catch (error) {
        console.error(`Error while indexing to Vectara: ${error}`);
    }
}

export async function action({ request }: ActionFunctionArgs) {
  const xata = getXataClient()
  const body = await request.formData()
  const title = body.get('title') as string
  const company = body.get('name') as string
  const content = body.get('content-html') as string
  const location = body.get('location') as string
  const apply_url = body.get('apply_url') as string
  const experience_level = body.get('experience_level') as string
  const job_type = body.get('job_type') as string
  const og_image_url = body.get('og_image') as string
  const og_image_w = body.get('og_image_w') as string
  const og_image_h = body.get('og_image_h') as string
  const author_image_url = body.get('author_image') as string
  const author_image_w = body.get('author_image_w') as string
  const author_image_h = body.get('author_image_h') as string
  const randomSequence = randomBytes(2).toString('hex').substring(0, 4);
  const slug = `${company.toLowerCase().replace(/\s/g, '')}-${randomSequence}`;
  await xata.db.content.create({ 
        slug, 
        title, 
        content, 
        location, 
        apply_url, 
        experience_level, 
        job_type, 
        company, 
        author_image_url, 
        author_image_w, 
        author_image_h, 
        og_image_url, 
        og_image_w, 
        og_image_h 
    })
  
  await sendToVectara({
    slug,
    company,
    title,
    content,
    location,
    apply_url,
    experience_level,
    job_type
  })
  return redirect(`/content/${slug}`)
}

export default function Index() {
  return (
    <Form navigate={false} method="post" className="mt-8 flex flex-col">
      <span className="text-2xl font-semibold">New Job Posting</span>
      <span className="mt-8 font-medium">Company's Logo</span>
      <Upload className="mt-4 rounded-full w-[150px] h-[150px]" selector="author_image" />
      <span className="mt-8 font-medium">Company's Name</span>
      <input required autoComplete="off" id="name" name="name" placeholder="Company's Name" className="border outline-none focus:border-black rounded mt-2 px-4 py-2" />
      <span className="mt-8 font-medium">OG Image</span>
      <Upload className="mt-4" selector="og_image" />
      <span className="mt-8 font-medium">Job Title</span>
      <input required autoComplete="off" id="title" name="title" placeholder="Job Title" className="border outline-none focus:border-black rounded mt-2 px-4 py-2" />
      <span className="mt-8 font-medium">Job Location</span>
      <input required autoComplete="off" id="title" name="location" placeholder="Job Location" className="border outline-none focus:border-black rounded mt-2 px-4 py-2" />
      <span className="mt-8 font-medium">Link to Apply</span>
      <input required autoComplete="off" id="title" name="apply_url" placeholder="Link to Apply" className="border outline-none focus:border-black rounded mt-2 px-4 py-2" />
      <span className="mt-8 font-medium">Experience Level</span>
      <select name="experience_level" className="border outline-none focus:border-black rounded mt-2 px-4 py-2">
        <option value="Entry Level">Entry Level</option>
        <option value="Mid Level">Mid Level</option>
        <option value="Senior Level">Senior Level</option>
      </select>
      <span className="mt-8 font-medium">Job Type</span>
      <select name="job_type" className="border outline-none focus:border-black rounded mt-2 px-4 py-2">
        <option value="Full Time">Full-time</option>
        <option value="Part Time">Part-time</option>
        <option value="Internship">Internship</option>
      </select>
      <span className="mt-8 font-medium">Job Description</span>
      <input required className="hidden" id="content-html" name="content-html" />
      <Editor
        defaultValue={{}}
        storageKey="novel__editor"
        className="mt-4 shadow-none border rounded p-8"
        onUpdate={(e) => {
          if (!e) return
          const tmp = e.getHTML()
          const htmlSelector = document.getElementById('content-html')
          if (tmp && htmlSelector) htmlSelector.setAttribute('value', tmp)
        }}
      />
      {/* <span className="mt-8 font-medium">Slug</span>
      <input required autoComplete="off" id="slug" name="slug" placeholder="Slug" className="border outline-none focus:border-black rounded mt-2 px-4 py-2" /> */}
      <button type="submit" className="bg-white hover:bg-black text-black hover:text-white mt-8 px-3 border border-black py-1 rounded max-w-max">
        Publish &rarr;
      </button>
    </Form>
  )
}
