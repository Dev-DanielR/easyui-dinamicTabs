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
      if (newVal != oldVal) $('#theme-form').submit();
    }
  });
}

$(document).ready(setUpCombobox);

/* Tabs */

let tabs = {
  'google-tab' : { title : 'Google',     url : '/google' },
  'bing-tab'   : { title : 'Bing',       url : '/bing' },
  'ddg-tab'    : { title : 'DuckDuckGo', url : '/duckduckgo' }
};

function addTab(tabID) {
  let tab = tabs[tabID];
  if ($('#dt-panel').tabs('exists', tab.title)) $('#dt-panel').tabs('select', tab.title);
  else {
    $('#dt-panel').tabs('add', {
      title    : tab.title,
      content  : `
        <div id="${tabID}-loader" style="user-select: none; position: absolute; height: 100%; width: 100%; display: flex; justify-content: center; align-items: center;">
          <img src="custom/images/loading.gif" style="width: 50px; height: 50px;">
        </div>
        <iframe frameborder="0" id="${tabID}-content" class="easyui-panel" style="height: 98%; width: 100%;"></iframe>`,
      closable : true,
      tools    : [{
        iconCls:'icon-mini-refresh',
        handler: () => loadTabContent(tabID)
      }],
    });
    loadTabContent(tabID);
  }
}

function getTabIndex(title) {
  let index = -1;
  $('#dt-panel ul.tabs li').each(function(i, v) {
    if ($('.tabs-title', v).html() === title) index = i;
  });
  return index;
}

function loadTabContent(tabID) {
  const tab = tabs[tabID]

  disableElement(`${tabID}-content`, `${tabID}-loader`)
  $.get(tab.url, function(data, status) {
    if (status != 'success') data = 'Error 404!';
    console.log(data)
    $(`#${tabID}-content`).contents().find('body').html(data)
    enableElement(`${tabID}-content`, `${tabID}-loader`)
  });

};