$(function ()
{

	$(".btn_1").click(
		function (e) {
			var r = $('#r').val();
			r = parseFloat(r);
			
			if(isNaN(r))
			{
				alert("Not corect");
			}
			else
			{
				find_S(r);
			}
			e.preventDefault();
		}
	);
});
function find_S(r)
{
	$('#output_1').text(r*r*3.141592653589793238462643);
};
