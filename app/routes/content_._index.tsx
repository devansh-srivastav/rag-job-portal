import { getXataClient } from '@/xata.server'
import Image from '@/components/Utility/Image'
import { ActionFunctionArgs, json, redirect } from '@remix-run/node'
import { Form, Link, useActionData, useLoaderData } from '@remix-run/react'

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
        target: ['content', 'title', 'slug', 'author_name'],
      },
    ],
    fuzziness: 2,
  })
  // Extract the 'record' property from each search result containing the content
  const result = records.map((i) => i.record)
  return json({ search, result })
}

export default function Pics() {
  const images = useLoaderData<typeof loader>()
  const actionData = useActionData<typeof action>()
  return (
    <div className="mt-8 flex flex-col">
      <span className="text-2xl font-semibold">Job Listings</span>
      <Form method="post" className="mt-8 flex flex-row items-center w-full gap-x-2">
        <input
          id="search"
          name="search"
          autoComplete="off"
          placeholder={actionData?.search || 'Search'}
          className="border outline-none w-full focus:border-black rounded px-4 py-1.5"
        />
        <button type="submit" className="bg-white hover:bg-black text-black hover:text-white px-3 border border-black py-1 rounded max-w-max">
          Search
        </button>
      </Form>
      {(actionData?.result || images)
        .filter((i) => i.slug)
        .sort((a, b) => (a.xata.createdAt < b.xata.createdAt ? 1 : -1))
        .map((i, _: number) => (
          <Link className="relative mt-8" key={i.slug} to={'/content/' + i.slug}>
            <div className="max-w-[800px] border border-gray-200 rounded px-3 py-1 bottom-4 left-4 flex flex-row items-center min-h-[20px] gap-x-10 z-20">
              <Image alt={i.author_name} url={i.author_image_url} width={i.author_image_w} height={i.author_image_h} className="h-[100px] w-[100px] rounded-full" />
              <div>
                <span><strong>{i.title}</strong></span> 
                <br />
                <span>{i.author_name}</span> 
                <br />
                <span className="text-gray-500">{i.location}</span>
                <br />
                <span className="text-gray-500">{i.experience_level} - {i.job_type}</span> 
                <br />
                <span className="text-gray-500">Posted On: {new Date(i.xata.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
            {/* <span>{i.content && <div className="mt-8 prose" dangerouslySetInnerHTML={{ __html: i.content }} />}</span> */}
            {/* <Image className="mt-4" alt={i.title} url={i.og_image_url} width={i.og_image_w} height={i.og_image_h} loading={_ === 0 ? 'eager' : 'lazy'} /> */}
          </Link>
        ))}
    </div>
  )
}
