import React from 'react'
import { Pagination } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Paginate = ({ pages, page }) => {
    return pages > 1 && (
        <Pagination>
            {[...Array(pages).keys()].map(x => (
                <Pagination.Item active={x+1 === page}> <Link key={x+1} to={`/coursesoffer/page/${x +1 }`}>{x+1}</Link></Pagination.Item>
            ))}
        </Pagination>
    )
}

export default Paginate
