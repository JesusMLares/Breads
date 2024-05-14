const React = require("react");
const Default = require("./layouts/default");

function Index({ breads }) {
  return (
    <Default>
      <h2>Index Page</h2>
      <ul>
        {breads.map((bread) => {
          return (
            <li key={bread.id}>
              <a href={`/breads/${bread.id}`}>{bread.name}</a>
            </li>
          );
        })}
      </ul>
      <div className="newButton">
        <a href="/breads/new">
          <button>Add a new bread</button>
        </a>
      </div>
    </Default>
  );
}

module.exports = Index;
