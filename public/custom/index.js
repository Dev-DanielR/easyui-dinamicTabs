/* Loading */

function disableElement(elementID, loaderID) {
  $(`#${elementID}`).addClass('disabledClass');
  $(`#${elementID} :input`).prop('disabled', true);
  $(`#${loaderID}`).css('z-index', 9999);
}

function enableElement(elementID, loaderID) {
  $(`#${loaderID}`).css('z-index', -1);
  $(`#${elementID}`).removeClass('disabledClass');
  $(`#${elementID} :input`).prop('disabled', true);
}

/* Combo-box */

let options = [
  { key: 'black',             name : 'Black'},
  { key: 'bootstrap',         name : 'Bootstrap'},
  { key: 'default',           name : 'Default'},
  { key: 'gray',              name : 'Gray'},
  { key: 'material',          name : 'Material'},
  { key: 'material-blue',     name : 'Material Blue'},
  { key: 'material-teal',     name : 'Material Teal'},
  { key: 'metro',             name : 'Metro'},
  { key: 'metro-blue',        name : 'Metro Blue'},
  { key: 'metro-gray',        name : 'Metro Gray'},
  { key: 'metro-green',       name : 'Metro Green'},
  { key: 'metro-orange',      name : 'Metro Orange'},
  { key: 'metro-red',         name : 'Metro Red'},
  { key: 'ui-cupertino',      name : 'Cupertino'},
  { key: 'ui-dark-hive',      name : 'Dark Hive'},
  { key: 'ui-pepper-grinder', name : 'Pepper Grinder'},
  { key: 'ui-sunny',          name : 'Sunny'},
];

function setUpCombobox() {
  $('#cb-theme').combobox({
    valueField :'key',
    textField  :'name',
    data       : options,
    editable   : false,
    onChange : function(newVal, oldVal) {
      if (newVal != oldVal) $('link')[0].href = `easyui/themes/${newVal}/easyui.css`;
    }
  });
}

$(document).ready(setUpCombobox);

/* Tabs */

let tabs = {
  'google-tab' : { title : 'Google',     url : '/google.html' },
  'bing-tab'   : { title : 'Bing',       url : '/bing.html' },
  'ddg-tab'    : { title : 'DuckDuckGo', url : '/duckduckgo.html' }
};

function addTab(tabID) {
  let tab = tabs[tabID];
  if ($('#dt-panel').tabs('exists', tab.title)) $('#dt-panel').tabs('select', tab.title);
  else loadTabContent(tab.url, (content) => {
    $('#dt-panel').tabs('add', {
      title    : tab.title,
      content  : content,
      closable : true,
      tools    : [{
        iconCls:'icon-mini-refresh',
        handler: () => refreshTab(tabID)
      }],
    });
  });
}

function loadTabContent(url, callback) {
  disableElement('content', 'loading');
  $.get(url, function(data, status) {
    switch (status) {
      case 'success': callback(data); break;
      default:        callback("Error 404!");
    }
    enableElement('content', 'loading');
  });
}

function getTabIndex(title) {
  let index = -1;
  $('#dt-panel ul.tabs li').each(function(i, v) {
    if ($('.tabs-title', v).html() === title) index = i;
  });
  return index;
}

function refreshTab(tabID) {
  const
    tab    = tabs[tabID],
    tabRef = $('#dt-panel').tabs('tabs'),
    index  = getTabIndex(tab.title);

  if (index != -1) loadTabContent(tab.url, (content) => {
    $('#dt-panel').tabs('update', {
      tab     : tabRef[index],
      options : { content: content }
    });
  });
};