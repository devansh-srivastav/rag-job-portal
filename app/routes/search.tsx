// import { useSearch } from "@vectara/react-search/lib/useSearch";
/* snip */

// const VECTARA_CUSTOMER_ID = process.env.VECTARA_CUSTOMER_ID || '';
// const VECTARA_CORPUS_ID = "4";
// const VECTARA_API_KEY = process.env.VECTARA_API_KEY || '';

// export default function SemanticSearch() {
//     return (

// <ReactSearchNext
//   customerId={VECTARA_CUSTOMER_ID}
//   corpusId={VECTARA_CORPUS_ID}
//   apiKey={VECTARA_API_KEY}
//   placeholder="Search Jobs" // Optional search input placeholder
//   isDeeplinkable={true} // Optional boolean determining if search results will be deeplinked
//   openResultsInNewTab={true} // Optional boolean determining if links will open in a new tab
//   zIndex={5} // Optional number assigned to the z-index of the search modal
// />
//     )}

// import pkg from '@vectara/react-chatbot';
// const { ReactChatbot } = pkg;

//     export default function () {
//       return <div>
//         <ReactChatbot
//           customerId={VECTARA_CUSTOMER_ID}
//           corpusIds={[VECTARA_CORPUS_ID]}
//           apiKey={VECTARA_API_KEY}
//           title="Vectara Docs Chatbot"
//           placeholder='Try "What is Vectara?" or "How does RAG work?"'
//           inputSize="large"
//           enableStreaming={true}
//           isInitiallyOpen={ true}
//         />
//       </div>
//     };

// import { useSearch } from "@vectara/react-search/lib/useSearch.js";

// export default function (){
//   const { fetchSearchResults, isLoading } = useSearch(
//     VECTARA_CUSTOMER_ID,
//     VECTARA_CORPUS_ID,
//     VECTARA_API_KEY
// )
// return <button onClick={() => fetchSearchResults("React").then(console.log)}>Search</button>
// };


// // to use this install node-fetch from npm using 'npm install node-fetch --save'
// fetch("https://api.vectara.io:443/v1/stream-query", {
// headers: {
//   "Content-Type": "application/json",
//   authorization: "Bearer eyJraWQiOiJJU2V1a3d6SUcrb0NPa1U2V3lud3Q5cUV6dkZ1WkdEa3pGKzhTaGdTQzd3PSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiJlODhmNTY1NS0xYWEwLTQxYzEtOGFjMC0zMGRjMDFkOTljMTYiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLnVzLXdlc3QtMi5hbWF6b25hd3MuY29tXC91cy13ZXN0LTJfQ1FVY3ZPdmRWIiwiY29nbml0bzp1c2VybmFtZSI6ImRldmFuc2guc3JpdmFzdGF2Iiwib3JpZ2luX2p0aSI6ImEzOTFiYzVlLTQyOWItNDkzMy1iZjI0LTQ2YjFhZmQ0ODA0ZiIsImF1ZCI6IjFmYTkzcjNnZmVvNHR2ZDVpNzNoOGsxYjUzIiwiZXZlbnRfaWQiOiI5MGNkZDgzOC04MjMxLTRhYTMtOGZjYy0xYzEyMDdkY2U2NmIiLCJ0b2tlbl91c2UiOiJpZCIsImF1dGhfdGltZSI6MTcxMzA5MzI5MiwiZXhwIjoxNzEzMTI0MzMxLCJpYXQiOjE3MTMxMjA3MzIsImp0aSI6IjEzNmQ0MzhjLTY1YjktNDZjNC04MGYxLWE5Njc3MDFjOGFlMyIsImVtYWlsIjoiZGV2YW5zaC5zcml2YXN0YXZAZ21haWwuY29tIn0.UYR6t1Tj9IsM48dt4s3rSIo4d33DmFPtaaCGBouo7k3Xqf6jjPu29wKYx9I0Vey0AKBSLuvM7rMlnNnQ_bIxN8FSFMFVuoN9SPj1cP6H7dvFvSdprGL7bOf2ph6a2BBmqh093lEpenEW4lfAgYK7o7vnE4BgXH3_HHGjMd88GpxYZZY_wHYRYxMRj11KYz19RE544lv_EJm3lYH7fI3FMG8TJtI2hQc1-t_CIxdISU585eemK0QowRcFs-0iiH7E8y8dLZA6efy_YgKabRg8YpuevYyr6rPnzOVi5ZbZxrPINa8eopONf1DdJo34AfX3UY0LrBaoKc3abCERLR3NSA",
//   "customer-id": "1694350142",
// },
// body: "{\"query\":[{\"query\":\"what jobs are there where i can apply if i know postgres sql\",\"queryContext\":\"\",\"start\":0,\"numResults\":10,\"contextConfig\":{\"charsBefore\":0,\"charsAfter\":0,\"sentencesBefore\":2,\"sentencesAfter\":2,\"startTag\":\"%START_SNIPPET%\",\"endTag\":\"%END_SNIPPET%\"},\"corpusKey\":[{\"customerId\":1694350142,\"corpusId\":4,\"semantics\":0,\"metadataFilter\":\"\",\"lexicalInterpolationConfig\":{\"lambda\":0.025},\"dim\":[]}],\"summary\":[{\"debug\":false,\"chat\":{\"store\":true,\"conversationId\":\"\"},\"maxSummarizedResults\":5,\"responseLang\":\"eng\",\"summarizerPromptName\":\"vectara-summary-ext-v1.2.0\",\"factualConsistencyScore\":true}]}]}",
// method: "post",
// })
// .then((res) => res.json())
// .then((data) => console.log(data))
// .catch((error) => console.log(error))


import React, { useState } from 'react';
import { ActionFunctionArgs, json, redirect } from '@remix-run/node'
import { Form, Link, useActionData, useLoaderData } from '@remix-run/react'

export async function action({ request }: ActionFunctionArgs) {
    const body = await request.formData()
    const search = body.get('search') as string
    // If the 'search' parameter is missing, redirect to '/content'
    if (!search) return redirect('/content')
    // console.log(process.env.VECTARA_API_KEY)
    const semantic = await fetch("https://api.vectara.io:443/v1/query", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer eyJraWQiOiJJU2V1a3d6SUcrb0NPa1U2V3lud3Q5cUV6dkZ1WkdEa3pGKzhTaGdTQzd3PSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiJlODhmNTY1NS0xYWEwLTQxYzEtOGFjMC0zMGRjMDFkOTljMTYiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLnVzLXdlc3QtMi5hbWF6b25hd3MuY29tXC91cy13ZXN0LTJfQ1FVY3ZPdmRWIiwiY29nbml0bzp1c2VybmFtZSI6ImRldmFuc2guc3JpdmFzdGF2Iiwib3JpZ2luX2p0aSI6IjgwNTUwZmMzLTQ3ZDctNDA1YS1hZTZjLTRmMDAxZjAyN2M4YiIsImF1ZCI6IjFmYTkzcjNnZmVvNHR2ZDVpNzNoOGsxYjUzIiwiZXZlbnRfaWQiOiIzNjk3OTllMi05MTUxLTQxMjctYTc0OC01MzEyOWU5ZDAxZDkiLCJ0b2tlbl91c2UiOiJpZCIsImF1dGhfdGltZSI6MTcxMzE4ODk3NSwiZXhwIjoxNzEzMTkyNTc1LCJpYXQiOjE3MTMxODg5NzUsImp0aSI6ImVkZTU5NWYwLTFmNTgtNDQ5Yi1hOWQ3LTE1Y2ZhM2Y4ODViZiIsImVtYWlsIjoiZGV2YW5zaC5zcml2YXN0YXZAZ21haWwuY29tIn0.VJ6uG6Q4EAFcdERGdamj9uuyCu1T0IEyK6El6pnxmBcwA6jkB6hqN6aeYK14OqBWHtg7hwkyKhD1oPpj9en-PL3yVlE71LSWuAeBKjp5piqqF95SXji9-FNOx9JxE5hVfCfnjEXe--5O-azxi-lzi4_Gsi-5SbYmUGM5tQ4NLy4ajPop2kK04CZtdEOZ98IIg-v_kbEESCDv5MIJpaDkmZq9LGMPKgt5dq46tnkrvGdUAwzzRWrz-K0fknVtrez0KQN8hGn9Dj_ryJwdoaqmPKsVqpf3HVKti_j0k5xNK5yDwC5ttC1SN_7koGhUI4OwKqvkj0S0ujZqQCL34XX8JA",
        "customer-id": "1694350142",
      },
      body: JSON.stringify({
        query: [{
          query: search,
          numResults: 2,
          corpusKey: [{
            customerId: 1694350142,
            corpusId: 4
          }],
        }]
      })
    })
    const semanticData = await semantic.json()
    // console.log(semanticData)
    return json(semanticData.responseSet[0].document)
  }

function SearchComponent() {
  
  const actionData = useActionData<typeof action>()
  return (

    <div>
      <Form method="post" className="mt-8 flex flex-row items-center w-full gap-x-2">
        <input
          id="search"
          name="search"
          autoComplete="off"
        //   placeholder={actionData?.search || 'Search'}
          className="border outline-none w-full focus:border-black rounded px-4 py-1.5"
        />
        <button type="submit" className="bg-white hover:bg-black text-black hover:text-white px-3 border border-black py-1 rounded max-w-max">
          Search
        </button>
      </Form>
      <ul>
        {actionData?.map((result, index) => (
            <Link className="relative mt-8" key={index} to={'/content/' + result.id}>
            <div className="max-w-[800px] border border-gray-200 rounded px-3 py-1 bottom-4 left-4 flex flex-row items-center min-h-[20px] gap-x-10 z-20">
              {/* <Image alt={i.company} url={i.author_image_url} width={i.author_image_w} height={i.author_image_h} className="h-[100px] w-[100px] rounded-full" /> */}
              <div>
                <span><strong>{result.metadata.find(meta => meta.name === 'title').value}</strong></span> 
                <br />
                <span>{result.metadata.find(meta => meta.name === 'company').value}</span> 
                <br />
                <span className="text-gray-500">{result.metadata.find(meta => meta.name === 'location').value}</span>
                <br />
                <span className="text-gray-500">{result.metadata.find(meta => meta.name === 'experience_level').value} - {result.metadata.find(meta => meta.name === 'job_type').value}</span> 
                <br />
                <span className="text-gray-500">Posted On: {result.metadata.find(meta => meta.name === 'date_posted').value}</span>
              </div>
            </div>
            {/* <span>{i.content && <div className="mt-8 prose" dangerouslySetInnerHTML={{ __html: i.content }} />}</span> */}
            {/* <Image className="mt-4" alt={i.title} url={i.og_image_url} width={i.og_image_w} height={i.og_image_h} loading={_ === 0 ? 'eager' : 'lazy'} /> */}
          </Link>
        //   <li key={index}>
        //     <h2>{result.metadata.find(meta => meta.name === 'title').value}</h2>
        //     <p>{result.metadata.find(meta => meta.name === 'company').value}</p>
        //     <p>{result.metadata.find(meta => meta.name === 'location').value}</p>
        //     <p>{result.metadata.find(meta => meta.name === 'date_posted').value}</p>
        //     <p>{result.metadata.find(meta => meta.name === 'experience_level').value}</p>
        //     <p>{result.metadata.find(meta => meta.name === 'job_type').value}</p>
        //     <a href={result.metadata.find(meta => meta.name === 'link').value}>Apply Now</a>
        //   </li>
        ))}
      </ul>
    </div>
  );
}

export default SearchComponent;
