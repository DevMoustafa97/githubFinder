$(document).ready(function(){
    $('#searchUser').on('keyup',(e)=>{
        let username = e.target.value;
        //Make request to github..
        $.ajax({
            url:'https://api.github.com/users/'+username,
            data:{
                client_id:'61844dfe4a74d42000fd',
                client_secret:'49f2cddfb0992aad4b91756a9b2351e92bef1722'
            }
        }).done((user)=>{
            $.ajax({
                url:'https://api.github.com/users/'+username+'/repos',
                data:{
                    client_id:'61844dfe4a74d42000fd',
                    client_secret:'49f2cddfb0992aad4b91756a9b2351e92bef1722',
                    sort:'created: asc',
                    per_page:5
                }
            }).done((repos)=>{
                $.each(repos,(index,repo)=>{
                    $('#repos').append(
                        `<div class="well">
                            <div class='row mb-4' >
                                <div class="col-md-7">
                                    <strong>${repo.name}</strong>: ${repo.description}
                                </div>
                                <div class="col-md-3">
                                <span class="badge badge-default">Public Repos:${repo.forks_count}</span>
                                <span class="badge badge-primary">Public Gists:${user.public_gists}</span>
                                <span class="badge badge-success">Followers :${user.followers}</span>

                                </div>
                                <div class="col-md-2">
                                    <a href="${repo.html_url}" target="_blank" class="btn btn-info">Repo Page</a>
                                </div>
                            </div>

                        </div>`
                        )
                })
            })
            $('#profile').html(`
            <div class="panel panel-default">
                <div class="panel-heading"><h3>${user.name}</h3></div>
                <div class="panel-body">
                    <div class="row">
                        <div class="col-md-3">
                            <img class="thumbnail avatar" src="${user.avatar_url}">
                            <a target="_blank" class="btn btn-primary btn-block mt-2 mb-2" href="${user.html_url}">View Profile</a>
                        </div>
                        <div class="col-md-9">
                            <span class="badge badge-default">Public Repos:${user.public_repos}</span>
                            <span class="badge badge-primary">Public Gists:${user.public_gists}</span>
                            <span class="badge badge-success">Followers :${user.followers}</span>
                            <span class="badge badge-info">Following:${user.following}</span>
                            <ul class="list-group">
                                <li class="list-group-item">Company:${user.company == null?'no company yet':user.company}</li>
                                <li class="list-group-item">Website/Blog:${user.blog}</li>
                                <li class="list-group-item">Location:${user.location}</li>
                                <li class="list-group-item">Member Since:${user.created_at}</li>
                            </ul>
                        </div>
                        
                    </div>
                </div>
            </div>
            <h3 class="page-headder">Latest Repos</h3>
            <div id="repos">

            </div>
            `)
        })
    })
})