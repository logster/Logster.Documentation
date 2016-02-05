$(function () {
    hljs.initHighlighting();

    var $tocContent = $(".toc-content");
    if ($tocContent.length > 0) {
        var tocConfig = { container: ".toc-content", selectors: "h2,h3" };
        // set heading ids
        // $(tocConfig.selectors, $tocContent).each(function(){
        //     var $h = $(this);
        //     $h.prop("id", $h.text().replace(" ", "-").toLowerCase());
        // });
        
        // init toc
        $("#toc").toc(tocConfig);
        $("#toc-sidebar").removeClass("hidden");
    }
   
    // style tables
    $(".blog-main table").addClass("table table-responsive table-striped");
});