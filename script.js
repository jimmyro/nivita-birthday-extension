
console.log("running")

var ELEMENT = 1;
var DOCUMENT = 9;
var DOCUMENT_FRAGMENT = 11;
var TEXT = 3;

// Enter things that you'd like to replace
var MATCH = ['the', 'a', 'if', 'because', 'when', 'then'];
var REPLACE = ['HAPPY BIRTHDAY NIVITA', 'जन्मदिन मुबारक हो, निवीता'];

var LINKS = ['YEAH NIVS','AWW YISSSS','HBD HO','<3 <3 <3 <3', 
'जन्मदिन मुबारक हो, निवीता','我很喜歡你','生日快樂']

function walk(node) {
    // Function from here for replacing text: http://is.gd/mwZp7E

    var child, next;

    switch (node.nodeType) {
        case ELEMENT:  // Element
        case DOCUMENT:  // Document
        case DOCUMENT_FRAGMENT: // Document fragment
            child = node.firstChild;
            while (child) {
                next = child.nextSibling;
                walk(child);
                child = next;
            }
            break;

        case TEXT: // Text node
            replaceText(node);
            break;
    }
}

function replaceText(textNode) {
    var v = textNode.nodeValue;

    // Go through and match/replace all the strings we've given it, using RegExp.
    for (var i = 0; i < MATCH.length; i++) {
        v = v.replace(new RegExp('\\b' + MATCH[i] + '\\b', 'g'), REPLACE[i]);
    }

    textNode.nodeValue = v;
}

// PICS = []
PIC_COUNT = 28 // hard-coded :(

function nivitafy() {

  $("img").each(function() {
    var $img = $(this);
    var imgsrc = $img.attr('src');

    var path = "images/" + Math.floor(Math.random() * PIC_COUNT) + ".png";
    console.log(path);

    $img.attr('src', chrome.extension.getURL(path));
    $img.attr('srcset', chrome.extension.getURL(path));
  });

  $("a").each(function() {
    if ($(this).find('img').length) {
        console.log("skipped img");
    } else {
        $(this).text(LINKS[Math.floor(Math.random() * LINKS.length)]);
    }
  });

  $("body").prepend("<div class='hbd'>HAPPY BIRTHDAY NIVS!!! जन्मदिन मुबारक हो, निवीता!!!</div>");
  $(".hbd").fadeIn("slow");
}

function changeCSS() {

    console.log("Inserting CSS link")

    document.head.insertAdjacentHTML('beforeend',
        '<link rel="stylesheet" type="text/css" href="' + 
               chrome.runtime.getURL("bg.css") + '"/>'
    );
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  nivitafy();
  changeCSS();
  walk(document.body);
});














