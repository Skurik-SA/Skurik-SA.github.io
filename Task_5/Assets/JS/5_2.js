function recursion(Node)
{
    console.log(Node);
    let s = Node.children

    if (s.length > 0)
    {
        for( let i = 0; i < s.length; i++)
            recursion(s[i]);
    }
}

recursion(document.getElementById("html"));