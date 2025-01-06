import React from 'react';

const TooManyResults = () => <div>Too many possibilities, please narrow your search.</div>;
const ViewableResults = ({ results }) => (
    <ul>
        {results.map((result, index) => (
            <li key={index}>{result.name.common}</li>
        ))}
    </ul>
);
const SingleResult = ({ result }) => <div>{result.name.common}</div>;
const NoResults = () => <div>No possibilities found.</div>;

const Results = ({ countries, search }) => {
    const results = countries.filter(country =>
        country.name.common.toLowerCase().includes(search.toLowerCase())
    );
    // console.log(results)

    if (countries.length === 0) {
        return <div>Loading...</div>;
    } else if (results.length > 10) {
        return <TooManyResults />;
    } else if (results.length > 1) {
        return <ViewableResults results={results} />;
    } else if (results.length === 1) {
        return <SingleResult result={results[0]} />;
    } else {
        return <NoResults />;
    }
};

export default Results;