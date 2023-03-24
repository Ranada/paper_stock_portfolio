/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
export default function Form() {
  return (
    <>
      <form action="#" method="POST">
        <div className="overflow-hidden">
          <div className="mb-8 flex flex-wrap items-end space-x-4">
            <div className="w-1/6">
              <label
                htmlFor="ticker"
                className="block text-sm font-medium leading-6 text-white"
              >
                Search ticker
              </label>
              <input
                type="text"
                name="ticker"
                id="ticker"
                autoComplete=""
                className="bg-white/[.10] text-white mt-2 block w-full rounded-md border-0 py-1.5 pl-2.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
            <div className="w-1/6">
              <button
                type="submit"
                className="inline-flex justify-center rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}
