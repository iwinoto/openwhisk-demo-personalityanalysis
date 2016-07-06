//------------------------------------------------------------------------------
// Create a feed
// Trigger when a new document is added to Cloudant database
// This action should listen for a Cloudant/change feed
// Parameters in the feed is the new document passed in from the change feed.
//------------------------------------------------------------------------------

/**
 * Listens to Cloudant changes and create a feed.
 */
function main(doc) {
  console.log("[", doc._id, "] Document change detected for type", doc.type);

  // nothing to do on deletion event
  if (doc._deleted) {
    console.log("[", doc._id, "] Ignored, delete");
    remove(doc);
    whisk.done();
  } else {
	console.log("[", doc._id, "] New or updated. Trigger newSpeech with doc");
	whisk.trigger({
	  name: "/iwinoto@au1.ibm.com_dev/newSpeech",
	  parameters: doc,
	  next: function(){ whisk.done(); }
	});
  }
}
