const React = require("react");
const Default = require("./layouts/default");

//Create error page using default page
function error404() {
  return (
    <Default>
        <h2>PAGE NOT FOUND</h2>
        <p>Oops, sorry, we can't find this page!</p>
    </Default>
  );
}

// See index.js
module.exports = error404;
