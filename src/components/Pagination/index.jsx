import React from 'react'

const Pagination = ({ current, last, pageChange }) => {
    let delta = 2,
        left = current - delta,
        right = current + delta + 1,
        range = [],
        rangeWithDots = [],
        l;

    for (let i = 1; i <= last; i++) {
        if (i === 1 || i === last || (i >= left && i < right)) {
            range.push(i);
        }
    }

    for (let i of range) {
        if (l) {
            if (i - l === 2) {
                rangeWithDots.push(l + 1);
            } else if (i - l !== 1) {
                rangeWithDots.push("...");
            }
        }
        rangeWithDots.push(i);
        l = i;
    }

    return (
        <div className='flex justify-center'>
            <ul className="inline-flex items-center -space-x-px rounded-md my-3">
                {rangeWithDots?.map((item) => (
                    <li key={item} role="button">
                        {current === item ? (
                            <p className="z-10 px-3 py-2 leading-tight text-sky-600 border border-sky-300 bg-sky-200 hover:bg-sky-100 hover:text-sky-700 ">{item}</p>
                        ) : (
                            <p onClick={() => pageChange(item)} className="px-3 py-2 leading-tight text-gray-500  border border-gray-200 hover:bg-sky-100 hover:text-gray-700 ">{item}</p>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Pagination