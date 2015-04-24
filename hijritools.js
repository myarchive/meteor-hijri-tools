function getInt(floatNum) {  
     if (floatNum< -0.0000001)  
     {  
         return Math.ceil(floatNum-0.0000001);  
     }  
     return Math.floor(floatNum+0.0000001);  
 }  

this.conv2hijri = function(e) {
    var t = new Date(e);
    day = t.getDate();
    month = t.getMonth();
    year = t.getFullYear();
    m = month + 1;
    y = year;
    if (m < 3) {
        y -= 1;
        m += 12
    }
    a = Math.floor(y / 100);
    b = 2 - a + Math.floor(a / 4);
    if (y < 1583) b = 0;
    if (y == 1582) {
        if (m > 10) b = -10;
        if (m == 10) {
            b = 0;
            if (day > 4) b = -10
        }
    }
    jd = Math.floor(365.25 * (y + 4716)) + Math.floor(30.6001 * (m + 1)) + day + b - 1524;
    b = 0;
    if (jd > 2299160) {
        a = Math.floor((jd - 1867216.25) / 36524.25);
        b = 1 + a - Math.floor(a / 4)
    }
    bb = jd + b + 1524;
    cc = Math.floor((bb - 122.1) / 365.25);
    dd = Math.floor(365.25 * cc);
    ee = Math.floor((bb - dd) / 30.6001);
    day = bb - dd - Math.floor(30.6001 * ee);
    month = ee - 1;
    if (ee > 13) {
        cc += 1;
        month = ee - 13
    }
    year = cc - 4716;
    wd = ((jd + 1) % 7 + 7) % 7 + 1;
    iyear = 10631 / 30;
    epochastro = 1948084;
    epochcivil = 1948085;
    shift1 = 8.01 / 60;
    z = jd - epochastro;
    cyc = Math.floor(z / 10631);
    z = z - 10631 * cyc;
    j = Math.floor((z - shift1) / iyear);
    iy = 30 * cyc + j;
    z = z - Math.floor(j * iyear + shift1);
    im = Math.floor((z + 28.5001) / 29.5);
    if (im == 13) im = 12;
    id = z - Math.floor(29.5001 * im - 29);
    var n = new Array(8);
    n[0] = day;
    n[1] = month - 1;
    n[2] = year;
    n[3] = jd - 1;
    n[4] = wd - 1;
    n[5] = id;
    n[6] = im - 1;
    n[7] = iy;
    return n
}

this.conv2grego = function(y, m, d) {
     var jd;  
     var i, j, k, l, r;  
     jd = getInt((11 * y + 3) / 30) + 354 * y + 30 * m - getInt((m - 1) / 2) + d + 1948440 - 385;  
     theDay=jd%7;  
     if (jd > 2299160)  
     {  
         l=jd+68569;  
         r=getInt((4*l)/146097);  
         l=l-getInt((146097*r+3)/4);  
         i=getInt((4000*(l+1))/1461001);  
         l=l-getInt((1461*i)/4)+31;  
         j=getInt((80*l)/2447);  
         d=l-getInt((2447*j)/80);  
         l=getInt(j/11);  
         m=j+2-12*l;  
         y=100*(r-49)+i+l;  
     }   
     else   
     {  
         j=jd+1402;  
         k=getInt((j-1)/1461);  
         l=j-1461*k;  
         r=getInt((l-1)/365)-getInt(l/1461);  
         i=l-365*r+30;  
         j=getInt((80*i)/2447);  
         d=i-getInt((2447*j)/80);  
         i=getInt(j/11);  
         m=j+2-12*i;  
         y=4*k+r+i-4716;  
     }  

     var n = new Array(3);
     
     n[0]=y;
     n[1]=m;
     n[2]=d;

     return n;
 }

Template.g2h.onRendered(function () {
    $('#g2h-input').keyup(function() {

        var gdn = new Array("Sun","Mon","Tue","Wed","Thu","Fri","Sat");
        var gmn = new Array("Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec");

        var hdn = new Array("Ahad","Ithnin","Thulatha","Arba","Khams","Jumuah","Sabt");
        var hmn = new Array("Muharram","Safar","Rabiul Awwal","Rabiul Akhir","Jumadal Ula","Jumadal Akhir","Rajab","Shaban","Ramadan","Shawwal","Dhul Qida","Dhul Hijja");

        var i = new Date($('#g2h-input').val());
        var iw = i.getDay();
        var id = i.getDate();
        var im = i.getMonth();
        var iy = i.getFullYear();
        var ir = (gmn[im] === undefined) ? "..." : (gdn[iw] + ", " + id + " " + gmn[im] + " " + iy + " CE");

        var h = conv2hijri(i);
        var hw = h[4];
        var hd = h[5];
        var hm = h[6];
        var hy = h[7];
        var hr = (hmn[hm] === undefined) ? "..." : (hdn[hw] + ", " + hd + " " + hmn[hm] + " " + hy + " AH");

        var out = (ir === "...") ? ir : ir + "<br><br>" + hr;
        $('#g2h-result').html(out);
    });
});
Template.h2g.onRendered(function () {
    $('#h2g-input').keyup(function() {

        var gdn = new Array("Sun","Mon","Tue","Wed","Thu","Fri","Sat");
        var gmn = new Array("Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec");

        var hdn = new Array("Ahad","Ithnin","Thulatha","Arba","Khams","Jumuah","Sabt");
        var hmn = new Array("Muharram","Safar","Rabiul Awwal","Rabiul Akhir","Jumadal Ula","Jumadal Akhir","Rajab","Shaban","Ramadan","Shawwal","Dhul Qida","Dhul Hijja");

        var i = $('#h2g-input').val();
        var i = i.split(" ").join("-").split(".").join("-").split(",").join("").split("-");

		if (i[1] === undefined) {
            if (isNaN(i) || i === "-" || i[0].length === 0) {
                $('#h2g-result').html("...");
            }
            else {
                var g1 = conv2grego(i*1, 1, 1);
                var g2 = conv2grego(i*1, 12, 29);
                var out = "Start: "+g1[0]+" - "+g1[1]+" - "+g1[2]+"<br>End: "+g2[0]+" - "+g2[1]+" - "+g2[2];
                $('#h2g-result').html(out);
            }            
        }
		
        else if (i[2] === undefined) {
            if (i[1].length === 0) {
                $('#h2g-result').html("...");
            }
            else {
                var g1 = conv2grego(i[0]*1, i[1]*1, 1);
                var g2 = conv2grego(i[0]*1, i[1]*1, 29);
                var out = "Start: "+g1[0]+" - "+g1[1]+" - "+g1[2]+"<br>End: "+g2[0]+" - "+g2[1]+" - "+g2[2];
                $('#h2g-result').html(out);
            }            
        }
		
        else {
            var g = conv2grego(i[0]*1, i[1]*1, i[2]*1);
            var out = (isNaN(g[0])) ? "..." : g[0]+" - "+g[1]+" - "+g[2];
            $('#h2g-result').html(out);
        }
    });
});
