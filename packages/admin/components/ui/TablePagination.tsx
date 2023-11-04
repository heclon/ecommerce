import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid'

interface TablePaginationProps {
  pageNumber: number
  count: number
  itemsPerPage: number
}

export const TablePagination = ({ pageNumber, count, itemsPerPage }: TablePaginationProps) => {
  const { query, pathname } = useRouter()
  const hasPages = React.useMemo(() => count > itemsPerPage, [count, itemsPerPage])
  const hasNextPage = React.useMemo(() => count > pageNumber * itemsPerPage, [count, pageNumber, itemsPerPage])
  if (!hasPages) return <></>
  return (
    <div className="flex items-center justify-between border-t border-gray-200 bg-white py-3 px-4 sm:px-6">
      <div className="flex flex-1 justify-between sm:hidden">
        {pageNumber > 1 && (
          <Link
            href={{
              pathname,
              query: { ...query, page: `${pageNumber - 1}` },
            }}
            className="relative inline-flex items-center rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 hover:bg-gray-100"
          >
            Previous
          </Link>
        )}
        {hasNextPage && (
          <Link
            href={{
              pathname,
              query: { ...query, page: `${pageNumber + 1}` },
            }}
            passHref
          >
            <p className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 hover:bg-gray-100">
              Next
            </p>
          </Link>
        )}
      </div>

      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            <span className="font-medium">Page {pageNumber}</span>
          </p>
        </div>
        <div>
          <nav className="relative z-0 inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
            {pageNumber > 1 && (
              <Link
                data-testid="table-pagination-previous"
                href={{
                  pathname,
                  query: { ...query, page: `${pageNumber - 1}` },
                }}
                passHref
              >
                <p className="relative inline-flex items-center rounded-l-md border border-gray-300 bg-white p-2 text-sm font-medium text-gray-600 hover:bg-gray-100">
                  <span className="sr-only">Previous</span>
                  <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                </p>
              </Link>
            )}

            {hasNextPage && (
              <Link
                data-testid="table-pagination-next"
                href={{
                  pathname,
                  query: { ...query, page: `${pageNumber + 1}` },
                }}
                passHref
              >
                <p className="relative inline-flex items-center rounded-r-md border border-gray-300 bg-white p-2 text-sm font-medium text-gray-600 hover:bg-gray-100">
                  <span className="sr-only">Next</span>
                  <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
                </p>
              </Link>
            )}
          </nav>
        </div>
      </div>
    </div>
  )
}
