define(['jquery',
'underscore',
'backbone',
'namespace'],
    function ($, _, Backbone, ns) {
        ns.define('rs.auth');
        if (rs.configurations.token == "") {
            $.support.cors = true;
            $.ajax({
                type: "POST",
                //url: "https://identity.api.rackspacecloud.com/v2.0/tokens",
                //contentType: "application/json",
                xhrFields: {
                    withCredentials: true
                },
                headers: {
                    "X-CorsProxy-Uri": "https://identity.api.rackspacecloud.com/v2.0/tokens"
                },
                crossDomain: true,
                //dataProcess:false,
                dataType: "json",
                data: { "auth": { "RAX-KSKEY:apiKeyCredentials": { "username": "debuguser", "apiKey": "14bed71231a7443b81a7bd3c4a954cb7" } } },
                success: function (a, b, c) {
                    //for test
                    console.log(a);
                    console.log(b);
                    console.log(c);
                }
            });
        }
        else {
            //for test
            alert("logged");
        }
    });

var getdetailallserver = {
    "servers": [
                    {
                        "OS-DCF:diskConfig": "AUTO",
                        "OS-EXT-STS:power_state": 1,
                        "OS-EXT-STS:task_state": null,
                        "OS-EXT-STS:vm_state": "active",
                        "RAX-SI:image_schedule": {
                            "retention": 3
                        },
                        "accessIPv4": "5.79.23.47",
                        "accessIPv6": "2a00:1a48:7805:112:dc21:7ec0:ff08:4bb4",
                        "addresses": {
                            "private": [
                                            {
                                                "addr": "10.179.3.116",
                                                "version": 4
                                            }
                            ],
                            "public": [
                                            {
                                                "addr": "5.79.23.47",
                                                "version": 4
                                            },
                                            {
                                                "addr": "2a00:1a48:7805:0112:dc21:7ec0:ff08:4bb4",
                                                "version": 6
                                            }
                            ]
                        },
                        "created": "2013-04-04T20:10:30Z",
                        "flavor": {
                            "id": "2",
                            "links": [
                                    {
                                        "href": "https://lon.servers.api.rackspacecloud.com/10099999/flavors/2",
                                        "rel": "bookmark"
                                    }
                            ]
                        },
                        "hostId": "8db66bfe16771e6505e87ced4d8f5a23916faf3105c7837eae12daba",
                        "id": "4aad5702-b54a-4190-9953-966805a61a4a",
                        "image": {
                            "id": "c195ef3b-9195-4474-b6f7-16e5bd86acd0",
                            "links": [
                                        {
                                            "href": "https://lon.servers.api.rackspacecloud.com/10099999/images/c195ef3b-9195-4474-b6f7-16e5bd86acd0",
                                            "rel": "bookmark"
                                        }
                            ]
                        },
                        "links": [
                                    {
                                        "href": "https://lon.servers.api.rackspacecloud.com/v2/10099999/servers/4aad5702-b54a-4190-9953-966805a61a4a",
                                        "rel": "self"
                                    },
                                    {
                                        "href": "https://lon.servers.api.rackspacecloud.com/10099999/servers/4aad5702-b54a-4190-9953-966805a61a4a",
                                        "rel": "bookmark"
                                    }
                        ],
                        "metadata": {},
                        "name": "linux-server",
                        "progress": 100,
                        "status": "ACTIVE",
                        "tenant_id": "10099999",
                        "updated": "2013-06-03T17:29:46Z",
                        "user_id": "12345"
                    }
    ]
}

var detailOneServer = {
    "server": {
        "OS-DCF:diskConfig": "AUTO",
        "OS-EXT-STS:power_state": 1,
        "OS-EXT-STS:task_state": null,
        "OS-EXT-STS:vm_state": "active",
        "accessIPv4": "198.101.241.238",
        "accessIPv6": "2001:4800:780e:0510:d87b:9cbc:ff04:513a",
        "addresses": {
            "private": [
{
    "addr": "10.180.3.171",
    "version": 4
}
            ],
            "public": [
{
    "addr": "198.101.241.238",
    "version": 4
},
{
    "addr": "2001:4800:780e:0510:d87b:9cbc:ff04:513a",
    "version": 6
}
            ]
        },
        "created": "2012-08-16T18:41:43Z",
        "flavor": {
            "id": "2",
            "links": [
{
    "href": "https://dfw.servers.api.rackspacecloud.com/010101/flavors/2",
    "rel": "bookmark"
}
            ]
        },
        "hostId": "33ccb6c82f3625748b6f2338f54d8e9df07cc583251e001355569056",
        "id": "ef08aa7a-b5e4-4bb8-86df-5ac56230f841",
        "image": {
            "id": "3afe97b2-26dc-49c5-a2cc-a2fc8d80c001",
            "links": [
{
    "href": "https://dfw.servers.api.rackspacecloud.com/010101/images/3afe97b2-26dc-49c5-a2cc-a2fc8d80c001",
    "rel": "bookmark"
}
            ]
        },
        "links": [
{
    "href": "https://dfw.servers.api.rackspacecloud.com/v2/010101/servers/ef08aa7a-b5e4-4bb8-86df-5ac56230f841",
    "rel": "self"
},
{
    "href": "https://dfw.servers.api.rackspacecloud.com/010101/servers/ef08aa7a-b5e4-4bb8-86df-5ac56230f841",
    "rel": "bookmark"
}
        ],
        "metadata": {
            "My Server Name": "API Test Server 2"
        },
        "name": "api-test-server 2",
        "progress": 100,
        "status": "ACTIVE",
        "tenant_id": "010101",
        "updated": "2012-08-16T18:50:38Z",
        "user_id": "170454"
    }
};