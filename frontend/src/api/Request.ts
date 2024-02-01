export async function my_request(url: string) {
    //access url
    const response = await fetch(url);

    //if it can not return url => error
    if(!response.ok){
        throw new Error(`Can not access the link ${url}`);
    }

    //if it s ok
    return response.json();
}