import React, { useState, useEffect } from 'react';

const HoldingsTable = () => {
const [holdings, setHoldings] = useState([]);

useEffect(() => {
fetch('/holdings')
.then(response => response.json())
.then(data => setHoldings(data));
}, []);

return (
<table>
<thead>
<tr>
<th>Name</th>
<th>Qty</th>
<th>Avg</th>
<th>Price</th>
<th>Net</th>
<th>Day</th>
</tr>
</thead>
<tbody>
{holdings.map(holding => (
<tr key={holding._id}>
<td>{holding.name}</td>
<td>{holding.qty}</td>
<td>{holding.avg}</td>
<td>{holding.price}</td>
<td>{holding.net}</td>
<td>{holding.day}</td>
</tr>
))}
</tbody>
</table>
);
};