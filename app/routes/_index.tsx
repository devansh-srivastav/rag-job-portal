import { Link } from '@remix-run/react'

export default function Index() {
  return (
    <div className="mt-8 flex flex-col">
      <span style={{ color: '#264cd6!important' }} className="text-3xl mt-7 mb-1 font-semibold">Welcome to Job Makerspace</span>
      <span className="text-xl font-semibold">The best place to find your next job or candidate.</span>
      <br />
      <span className="text-l font-semibold">Get started by selecting an option below.</span>
      <span className="mt-12 text-l font-semibold">I am looking for a candidate:</span>

      <div className="mt-10 mb-32 grid text-center lg:mb-0 lg:w-full lg:max-w-5xl lg:grid-cols-2 lg:text-left">
        <a
          href="/new-job/"
          className="group mr-6 rounded-lg border border px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_self"
          rel="noopener noreferrer"
        >
          <h2 className="mb-3 text-2xl font-semibold">
            Post New Job{" "}
          </h2>
          <p className="m-0 max-w-[30ch] text-sm opacity-50">
            Post a new job listing.
          </p>
        </a>
      
        <a
          href="https://search.jobmakerspace.live/"
          className="group ml-6 rounded-lg border border px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className="mb-3 text-2xl font-semibold">
            Search Profiles{" "}
          </h2>
          <p className="m-0 max-w-[30ch] text-sm opacity-50">
            Find your candidate with a simple search.
          </p>
        </a>

      </div>

      <span className="mt-12 text-l font-semibold">I am looking for a job:</span>

      <div className="mt-10 mb-32 grid text-center lg:mb-0 lg:w-full lg:max-w-5xl lg:grid-cols-3 lg:text-left">
        <a
          href="/content/"
          className="group mr-6 rounded-lg border border px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_self"
          rel="noopener noreferrer"
        >
          <h2 className="mb-3 text-2xl font-semibold">
            View All Jobs{" "}
          </h2>
          <p className="m-0 max-w-[30ch] text-sm opacity-50">
            Find all listed jobs.
          </p>
        </a>

        <a
          href="/pdf-search/"
          className="group mr-6 rounded-lg border border px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_self"
          rel="noopener noreferrer"
        >
          <h2 className="mb-3 text-2xl font-semibold">
            Smart Search{" "}
          </h2>
          <p className="m-0 max-w-[30ch] text-sm opacity-50">
            Upload your CV and explore the jobs that match your profile.
          </p>
        </a>
      
        <a
          href="https://chat.jobmakerspace.live/"
          className="group ml-6 rounded-lg border border px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className="mb-3 text-2xl font-semibold">
            Chat{" "}
          </h2>
          <p className="m-0 max-w-[30ch] text-sm opacity-50">
            Find a job by chatting with the job listings.
          </p>
        </a>

      </div>
      
    </div>
  )
}
