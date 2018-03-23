$(document).ready(function() {
  console.log("hey")
  // function loadStories(storyID) {

  //   $.ajax({
  //     method: "GET",
  //     url: "/api/stories/"
  //   }).done(function(stories) {
  //     console.log(stories);
  //   })
  // };
  function getPosts(category) {
    var categoriyString = category || "";
    $.get("/api/stories", function(data) {
      console.log(data);
    })
  }
  // loadStories();
  getPosts();
})