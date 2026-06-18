fetch("https://api.github.com/users/OneSec-Tech/repos")
.then(res=>res.json())
.then(data=>{

const repos=document.getElementById("repos");

data.slice(0,6).forEach(repo=>{

repos.innerHTML += `
<div class="repo">
<h3>${repo.name}</h3>
<p>${repo.description || "No description"}</p>
<br>
<a href="${repo.html_url}" target="_blank">
View Repository
</a>
</div>
`;

});

});
