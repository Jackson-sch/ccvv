import React from 'react'

export default function Lista({data}) {
  console.log("🚀 ~ Lista ~ data:", data)
  return (
    <div>
      <table className="w-full">
        <thead className="bg-sky-500">
          <tr>
            <th>Common name</th>
            <th>Official name</th>
          </tr>
        </thead>
        <tbody>
          {data.map((index) => (
            <tr key={index.cca2}>
              <td>{index.name.common}</td>
              <td>{index.name.official}</td>
            </tr>
          ))}
        </tbody>
      </table>
          <button>

          </button>
    </div>
  )
}
