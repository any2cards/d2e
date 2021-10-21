const inputChange = (evt) => {
  chrome.tabs.query({'active': true, 'currentWindow': true}, function (tabs) {
    chrome.runtime.sendMessage({input_id: evt.target.id, tab_id: tabs[0].id, checked: evt.target.checked});
  });
  
  // check/uncheck children checkboxes
  var parent = evt.target.parentElement;
  while (parent.nodeName != "DIV") {
    parent = parent.parentElement;
  }
  Array.from(parent.getElementsByTagName("input")).forEach(input => {
    if (input != evt.target) {
      input.checked = evt.target.checked;
    }
  });

  // uncheck parent checkboxes
  if (!evt.target.checked) {
    var parent = evt.target.parentElement;
    while (parent != null) {
      parent.getElementsByTagName("input")[0].checked = evt.target.checked;
      parent = parent.parentElement;
      while (parent != null && parent.nodeName != "DIV") {
        parent = parent.parentElement;
      }
    }
  }

  // check parent checkboxes
  if (evt.target.checked) {
    var target = evt.target;
    while (true) {
      var parent = target.parentElement;
      while (parent != null && parent.nodeName != "DIV") {
        parent = parent.parentElement;
      }
      parent = parent.parentElement;
      let allChecked = true;
      let inputs = Array.from(parent.getElementsByTagName("input"));
      let topInput = inputs.shift();
      inputs.forEach(input => {
        if (!input.checked) {
          allChecked = false;
        }
      });
      if (!allChecked) {
        break;
      }
      topInput.checked = true;
      target = topInput;
      if (topInput.id == "d2e") {
        break;
      }
    }
  }

  let inputArr = {};
  Array.from(document.getElementsByTagName("input")).forEach(input => {
    inputArr[input.id] = input.checked;
  });
  chrome.storage.sync.set({inputArr: inputArr});
};

document.body.onload = function() {
  var inputArr = {};
  chrome.storage.sync.get(['inputArr'], function(item) {
    inputArr = item.inputArr;
    Array.from(document.getElementsByTagName("input")).forEach(input => {
      input.addEventListener("change", inputChange);
      if (inputArr != undefined && input.id in inputArr) {
        document.getElementById(input.id).checked = inputArr[input.id];
      } else {
        document.getElementById(input.id).checked = true;
      }
    });
  });
}
