$(function()
    {
        $("#btn_2").click(
            function (e) {
                $("#output_2").text("None");
                var m = prompt("Введите M");
                n = parseInt(n);
                var n = prompt("Введите N");
                m = parseInt(m);
                
                if(isNaN(n) || isNaN(m))
                {
                    alert("Not correct");
                }
                else
                {
                    if(n > m)
                        $("#output_2").text(Prime(n, m));
                    else
                        alert("Not correct");
                }
                e.preventDefault();
            }
        );
    }
);

function Prime(n, m)
{
    S = []; 
	S[1] = 0; // 1 - не простое число
	// заполняем решето единицами
	for(k=2; k<=n; k++)
		S[k]=1;
	
	for(k=2; k*k<=n; k++){
		// если k - простое (не вычеркнуто)
		if(S[k]==1){ 
			// то вычеркнем кратные k
			for(l=k*k; l<=n; l+=k){
				S[l]=0;
				}
			}
		}
    pr = [];
    
    for(i = m; i < n; i++)
        {
            if (S[i] == 1)
                {
                    pr.push(i);
                }
        }
	return pr;
}

