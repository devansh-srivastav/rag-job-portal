import { getXataClient } from '@/xata.server'
import Image from '@/components/Utility/Image'
import { useLoaderData } from '@remix-run/react'
import { unescapeHTML } from '@/lib/util.server'
import { getTransformedImage } from '@/lib/ast.server'
import { LoaderFunctionArgs, redirect } from '@remix-run/node'

export async function loader({ params }: LoaderFunctionArgs) {
  if (!params.id) return redirect('/404')
  const xata = getXataClient()
  // Use the Xata client to fetch content from the 'content' table based on the 'slug'
  const content = await xata.db.content
    .filter({
      slug: params.id,
    })
    .getFirst()
  if (content) {
    const output = await getTransformedImage(content)
    return { ...content, content: unescapeHTML(output) }
  }
  // If content is not found, redirect to '/404'
  return redirect('/404')
}

export default function Pic() {
  const content = useLoaderData<typeof loader>()
  return (
    <div className="mt-8 flex flex-col">
      <span className="text-2xl font-semibold">{content.title}</span>
      <div className="mt-8 flex flex-row items-start gap-x-3">
        <Image alt={content.author_name} url={content.author_image_url} width={content.author_image_w} height={content.author_image_h} className="rounded-full w-[50px] h-[50px]" />
        <div className="flex flex-col">
          <span className="text-black font-semibold">{content.author_name}</span>
          <span className="text-gray-500">{content.location}</span>
          <span className="text-gray-500">{content.experience_level} - {content.job_type}</span>
          <span className="text-gray-500">Posted on {new Date(content.xata.createdAt).toLocaleDateString()}</span>
        </div>
       
      </div>
      <div className="flex justify-end">
        <button className="bg-white hover:bg-black text-black hover:text-white px-3 border border-black py-1 rounded max-w-max">
          <a href={content.apply_url}>Apply Now</a>
        </button>
      </div>
      <Image loading="eager" className="mt-8" alt={content.title} url={content.og_image_url} width={content.og_image_w} height={content.og_image_h} />
      {content.content && <div className="mt-8 prose" dangerouslySetInnerHTML={{ __html: content.content }} />}
    </div>
  )
}
