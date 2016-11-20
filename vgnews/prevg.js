// injection technique borrowed from http://stackoverflow.com/questions/840240/injecting-jquery-into-a-page-fails-when-using-google-ajax-libraries-api
window.onload = function() {
  var script = document.createElement("script");
  script.src = "https://code.jquery.com/jquery-3.1.0.min.js";
  script.onload = script.onreadystatechange = function() {
    if (typeof module === 'object') {window.module = module; module = undefined;}
    // window.$ = window.jQuery = require('../assets/js/jquery-3.1.0.min.js');
    $(document).ready(function() {
      console.log("HHH");
      $(document).ready(() => setTimeout(runAll, 2000));
      // $("#lst-ib").val("Hello, World!");
    });
    if (window.module) module = window.module;
  };
  document.body.appendChild(script);
};

// Removers
const blockAdBlockAds = () => {
  console.info('blockAdBlockAds');
  console.log($('button[data-stats-string="Adblock::OpenPopup"]'));
  $('button[data-stats-string="Adblock::OpenPopup"]').parent().remove();
  $('div#ad-topboard').remove();
  $('div.df-skin-cm-yellowbg').remove(); // Edge case
}

const removeTopBar = () => {
  console.info('removeTopBar');
  $('div#top-bar').remove();
}

const removeHeader = () => {
  console.info('removeHeader');
  $('header[role="banner"]').remove();
}

const removeFooterAndAllThatStuffDownThere = () => {
  console.info('removeFooterAndAllThatStuffDownThere');
  $('div#trafikkfondet-front').remove();
  $('div.betting-widgets').remove();
  $('div.vg-services').remove();
  $('div#tv-guide').remove();
  $('footer').remove();
}

const removeSideBar = () => {
  console.info('removeSideBar');
  $('aside.reg-grid-aside').remove();
}

const removeArticleImages = () => {
  console.info('removeArticleImages');
  $('div.article-extract').find('img').parent().parent().remove();
}

// yCombify

const DEBUG = false;

const yCombify = () => {
  console.info('yCombify');

  // Extract articles
  let articles = [];
  $('div.article-content').each(function() {
    if (DEBUG) console.log('article', this);
    // Extract text
    let text = '';
    $(this).find('h3 a').each(function() {
      let snippet = $(this).text();
      if (snippet) text += snippet + ' ';
    });
    text = text.trim();
    if (DEBUG) console.log('text', text);
    // Extract href
    const href = $(this).find('a').attr('href');
    if (DEBUG) console.log('href', href);
    // Save it
    if (text !== '') {
      if (href.indexOf('.no/') !== -1) {
        const domain = href.match(/([a-zA-Z0-9\.]+)\//)[1].replace('www.','');
        articles.push('<li><a href="'+href+'">'+text+'</a> ('+domain+')</li>');
      }
      else {
        articles.push('<li><a href="'+href+'">'+text+'</a></li>');
      }
    }
  });

  // Clear space for articles
  $('body').css('background-color', 'white');
  $('div.reg-grid-container')
    .html('')
    .css('background-color', 'rgb(246, 246, 239)')
    .css("max-width", "none")
    // .css("max-width", '')
    // .css('margin-top', '10px')
  ;

  // List articles like on HN

  $('div.reg-grid-container').html([
    '<div id="hackerheader">',
    '<img src="https://raw.githubusercontent.com/michaeljohansen/vg-news/master/128.png" /> ',
    '<span id="title">VG News</span>',
    '<span id="pages">new | comments | show | ask | jobs | submit</span>',
    '<span id="login">login</span>',
    '</div>',
    '<ol id="hackerlist">'+articles.join(' ')+'</ol>',
    '<br />',
    '<div id="footer">"VG News" made by Michael Johansen (michael@informatikk.org) for demo purposes.</div>',
    '<br />',
  ].join(''));
  // $('.reg-grid-container')
  //   .html('')
  //   .css('background-color', 'rgb(246, 246, 239)')
  // .css("max-width", "none")
  // .css('margin-top', '10px')
  ;
  // Style the header
  $('div#hackerheader')
    .attr('style', 'font-size: 13px !important')
    .css('font-weight', 'bold')
    .css('background-color', '#da0a16')
    .css('color', 'black')
    .css('height', '24px')
  ;
  $('div#hackerheader img')
    .css('position', 'relative')
    .css('width', '20px')
    .css('height', 'auto')
    .css('margin', '2px')
  ;
  $('div#hackerheader span#title')
    .css('position', 'relative')
    .css('margin-left', '3px')
    .css('line-height', '1')
    .css('top', '-7px')
  ;
  $('div#hackerheader span#pages')
    .css('position', 'relative')
    .css('font-weight', 'normal')
    .css('top', '-7px')
    .css('left', '7px')
  ;
  $('div#hackerheader span#login')
    .css('position', 'relative')
    .css('float', 'right')
    .css('font-weight', 'normal')
    .css('top', '6px')
    .css('right', '7px')
  ;

  // Style the list
  $('ol#hackerlist')
    .attr('style', 'font-size: 10pt !important')
    .css('font-family', 'verdana')
    .css('font-style', 'normal')
    .css('font-weight', 'normal')
    .css('list-style-type', 'decimal')
    .css('margin-left', '35px')
    .css('padding-top', '8px')
  ;
  $('ol#hackerlist li')
    .css('color', 'gray')
  ;
  $('ol#hackerlist li a')
    .css('color', 'black')
    .css('line-height', '2')
  ;

  // Style the footer
  $('div#footer')
    .css('margin', '10px')
    .css('font-weight', 'bold')
  ;
}

// Run all

const runAll = () => {
  // Remove basic stuff
  blockAdBlockAds();
  removeTopBar();
  removeHeader();
  removeSideBar();
  removeFooterAndAllThatStuffDownThere();
  // Remove article images
  removeArticleImages();
  // Ycombify
  yCombify();
}


