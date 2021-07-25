const functions = require('firebase-functions');
// [START init_elastic]
const { Client } = require("@elastic/elasticsearch");

// Initialize Elastic, requires installing Elastic dependencies:
// https://github.com/elastic/elasticsearch-js
//
// ID, username, and password are stored in functions config variables
const ELASTIC_ID = functions.config().elastic.id;
const ELASTIC_USERNAME = functions.config().elastic.username;
const ELASTIC_PASSWORD = functions.config().elastic.password;

const client = new Client({
  cloud: {
    id: ELASTIC_ID,
    username: ELASTIC_USERNAME,
    password: ELASTIC_PASSWORD,
  }
});


// [START update_index_function_elastic]
// Update the search index every time a blog post is written.
exports.onNoteCreated = functions.firestore.document('notes/{noteId}').onCreate(async (snap, context) => {
    // Get the note document
    const note = snap.data();
  
    // Use the 'nodeId' path segment as the identifier for Elastic
    const id = context.params.noteId;
  
    // Write to the Elastic index
    client.index({
      index: "notes",
      id,
      body: note,
    });
  });
  // [END update_index_function_elastic]