import { useEffect, useState } from "react";
import { PasswordValidator } from "./PasswordValidator";

export const PasswordList = ({ validated, search }) => {
    const [passwords, setPasswords] = useState([]);
    const [filters, setFilters] = useState({ page: 1, limit: 10, search: search || '' });
    const [pageInfo, setPageInfo] = useState({ from: 0, to: 0, total: 0 })

    const fetchPasswords = async () => {
        const url = new URL(location.href);
        url.pathname = 'api/password';
        url.searchParams.append('page', filters.page.toString());
        url.searchParams.append('search', filters.search);

        const res = await fetch(url, {
            headers: {
                "Content-Type": "application/json"
            },
        });


        const response = await res.json();

        setPasswords(response.passwords);

        pageInfo.total = response.total;
        pageInfo.from = (filters.page - 1) * filters.limit + 1;
        pageInfo.to = (filters.page) * filters.limit + 1;

        if (pageInfo.to > pageInfo.total) {
            pageInfo.to = pageInfo.total
        }

        setPageInfo({ ...pageInfo });
    }

    const onNext = (e) => {
        e.preventDefault();
        if (pageInfo.total > (filters.page * filters.limit)) {
            filters.page++;
            setFilters({ ...filters });
        }
    };

    const onPrev = (e) => {
        e.preventDefault();
        if (filters.page === 1) {
            return;
        }

        filters.page--;
        setFilters({ ...filters });
    };

    useEffect(() => { fetchPasswords() }, [filters]);

    return (
        <div className="w-full">
            <Header setFilters={setFilters} filters={filters} />
            <div className="flex flex-col">
                <div className="overflow-x-auto">
                    <div className="align-middle inline-block min-w-full">
                        <div className="shadow overflow-hidden">
                            <Table passwords={passwords} />
                        </div>
                    </div>
                </div>
            </div>
            <Pagination onNext={onNext} onPrev={onPrev} pageInfo={pageInfo} />
        </div>
    )
}

const Header = ({ setFilters, filters }) => {
    return (

        <div className="mb-1 w-full">
            <div className="mb-4">
                <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">History</h1>
            </div>
            <div className="sm:flex">
                <div className="hidden sm:flex items-center sm:divide-x sm:divide-gray-100 mb-3 sm:mb-0">
                    <form className="lg:pr-3" action="#" method="GET">
                        <label htmlFor="users-search" className="sr-only">Search</label>
                        <div className="mt-1 relative lg:w-64 xl:w-96">
                            <input
                                type="text"
                                name="email"
                                id="users-search"
                                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                                onChange={e => {
                                    e.preventDefault();
                                    setFilters({ ...filters, search: e.target.value });
                                }}
                                placeholder="Search for users" />
                        </div>
                    </form>
                </div>
                <div className="flex items-center space-x-2 sm:space-x-3 ml-auto">
                    <a href="#" className="w-1/2 text-gray-900 bg-white border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:ring-cyan-200 font-medium inline-flex items-center justify-center rounded-lg text-sm px-3 py-2 text-center sm:w-auto">
                        <svg className="-ml-1 mr-2 h-6 w-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v3.586l-1.293-1.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V8z" clipRule="evenodd"></path></svg>
                        Export
                    </a>
                </div>
            </div>
        </div>
    )
}

const Table = ({ passwords }) => {
    return (
        <table className="table-fixed min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
                <tr>
                    <th scope="col" className="p-4 text-left text-xs font-medium text-gray-500 uppercase">
                        Password
                    </th>
                    <th scope="col" className="p-4 text-left text-xs font-medium text-gray-500 uppercase">
                        Status
                    </th>
                    <th scope="col" className="p-4 text-left text-xs font-medium text-gray-500 uppercase">
                        Message
                    </th>
                    <th scope="col" className="p-4 text-left text-xs font-medium text-gray-500 uppercase">
                        Steps
                    </th>
                    <th scope="col" className="p-4 text-left text-xs font-medium text-gray-500 uppercase">
                        Created
                    </th>
                </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
                {passwords.map(row => <Row key={row._id} row={row} />)}
            </tbody>
        </table>
    )
}

export const Row = (props: any) => {
    const { row } = props;
    const date = new Date(row.created);
    return (
        <tr className="hover:bg-gray-100">
            <td className="p-4 whitespace-nowrap text-base font-medium text-gray-900">{row.password}</td><td className="p-4 whitespace-nowrap text-base font-normal text-gray-900">
                <div className="flex items-center">
                    {row.steps === 0 ?
                        <div><span className="inline-block h-2.5 w-2.5 rounded-full bg-green-400 mr-2"></span> Valid</div> :
                        <div><span className="inline-block h-2.5 w-2.5 rounded-full bg-red-400 mr-2"></span> Invalid</div>
                    }
                </div>
            </td>
            <td className="p-4 whitespace-nowrap text-base font-medium text-gray-900">{row.message}</td>
            <td className="p-4 whitespace-nowrap text-base font-medium text-gray-900">{row.steps}</td>
            <td className="p-4 whitespace-nowrap text-base font-medium text-gray-900">
                {date.toLocaleDateString()} {date.toLocaleTimeString()}
            </td>

        </tr>
    );
}

const Pagination = ({ pageInfo, onNext, onPrev }) => {
    return (

        <div className="bg-white sticky sm:flex items-center w-full sm:justify-between bottom-0 right-0 border-t border-gray-200 p-4">
            <div className="flex items-center mb-4 sm:mb-0">
                <a onClick={onPrev} href="#" className="text-gray-500 hover:text-gray-900 cursor-pointer p-1 hover:bg-gray-100 rounded inline-flex justify-center">
                    <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                </a>
                <a onClick={onNext} href="#" className="text-gray-500 hover:text-gray-900 cursor-pointer p-1 hover:bg-gray-100 rounded inline-flex justify-center mr-2">
                    <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path></svg>
                </a>
                <span className="text-sm font-normal text-gray-500">
                    Showing <span className="text-gray-900 font-semibold">{pageInfo.from}-{pageInfo.to}</span> of <span className="text-gray-900 font-semibold">{pageInfo.total}</span>
                </span>
            </div>
            <div className="flex items-center space-x-3">
                <button onClick={onPrev} className="flex-1 text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium inline-flex items-center justify-center rounded-lg text-sm px-3 py-2 text-center">
                    <svg className="-ml-1 mr-1 h-5 w-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                    Previous
                </button>
                <button onClick={onNext} className="flex-1 text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium inline-flex items-center justify-center rounded-lg text-sm px-3 py-2 text-center">
                    Next
                    <svg className="-mr-1 ml-1 h-5 w-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path></svg>
                </button>
            </div>
        </div>
    );
}