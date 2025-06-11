let selectedNode = null;

function selectNode(el) {
  if (selectedNode) selectedNode.classList.remove('selected');
  selectedNode = el;
  selectedNode.classList.add('selected');
  event.stopPropagation();
}

function addChild() {
  if (!selectedNode) return alert('Select a node first');
  const text = document.getElementById('nodeText').value.trim();
  if (!text) return;

  let ul = selectedNode.querySelector('ul');
  if (!ul) {
    ul = document.createElement('ul');
    selectedNode.appendChild(ul);
  }

  const li = document.createElement('li');
  li.textContent = text;
  li.onclick = function (event) {
    selectNode(this);
  };
  ul.appendChild(li);

  document.getElementById('nodeText').value = '';
}

function deleteNode() {
  if (!selectedNode || selectedNode.parentElement.id === 'mindmap') {
    alert('Cannot delete the root node');
    return;
  }
  selectedNode.remove();
  selectedNode = null;
}

function exportMap() {
  const data = serialize(document.querySelector('#mindmap > li'));
  const blob = new Blob([JSON.stringify(data, null, 2)], {type: 'application/json'});
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'mindmap.json';
  a.click();
}

function importMap(event) {
  const file = event.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = function (e) {
    const data = JSON.parse(e.target.result);
    const root = deserialize(data);
    const container = document.getElementById('mindmap');
    container.innerHTML = '';
    container.appendChild(root);
  };
  reader.readAsText(file);
}

function serialize(node) {
  const obj = {text: node.childNodes[0].nodeValue.trim()};
  const children = node.querySelectorAll(':scope > ul > li');
  if (children.length) {
    obj.children = [];
    children.forEach(child => {
      obj.children.push(serialize(child));
    });
  }
  return obj;
}

function deserialize(data) {
  const li = document.createElement('li');
  li.textContent = data.text;
  li.onclick = function (event) {
    selectNode(this);
  };

  if (data.children && data.children.length) {
    const ul = document.createElement('ul');
    data.children.forEach(child => {
      ul.appendChild(deserialize(child));
    });
    li.appendChild(ul);
  }

  return li;
}
