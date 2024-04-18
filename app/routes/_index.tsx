import { Link } from '@remix-run/react'

export default function Index() {
  return (
    <div className="mt-8 flex flex-col">
      <span className="text-2xl font-semibold">Welcome to Job Makerspace</span>

      <Link className="relative mt-8" to={'/content/'}>
      <div className="max-w-[800px] border border-gray-200 rounded px-3 py-1 bottom-4 left-4 flex flex-row items-center min-h-[20px] gap-x-10 z-20">
        <div>
          <span className="text-xl font-semibold">Find a Job</span> 
          <br />
        </div>
      </div>
      </Link>

      <Link className="relative mt-8" to={'/new-job/'}>
      <div className="max-w-[800px] border border-gray-200 rounded px-3 py-1 bottom-4 left-4 flex flex-row items-center min-h-[20px] gap-x-10 z-20">
        <div>
          <span className="text-xl font-semibold">Find a Candidate</span> 
          <br />
        </div>
      </div>
      </Link>
    </div>
  )
}
