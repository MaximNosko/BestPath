function getMousePosition(canvas, evt)
{
    var rect = canvas.getBoundingClientRect();
    return {x: Math.floor(evt.clientX - rect.left),y: Math.floor(evt.clientY - rect.top)};
}
function krug(context,x,y,color,fon)
{
    context.beginPath();
    context.lineWidth=1;
    context.globalAlpha=1;
    context.strokeStyle=color;
    context.arc(x,y,20,0, 2 * Math.PI);
    context.stroke();
    context.beginPath();
    context.fillStyle=fon;
    context.arc(x,y,20,0, 2 * Math.PI);
    context.fill();
}
function line(context,x1,y1,x2,y2)
{
    context.beginPath();
    context.lineWidth=1;
    context.globalAlpha=1;
    context.strokeStyle="rgb(100,100,100)";
    context.moveTo(x1,y1);
    context.lineTo(x2,y2);
    context.stroke();
    context.beginPath();
    context.fillStyle = "black";
    context.arc(x2,y2,5,0, 2 * Math.PI);
    context.stroke();
}
function lineText(context,x1,y1,x2,y2,text)
{
    context.textAlign="left";
    context.fillStyle = "black";
    context.font = "20px Arial";
    var r=25;
    if(y2!==y1)
    {
        if(y2>y1)
        {
            y1+=r;
            y2-=r;
        }
        else
        {
            y1-=r;
            y2+=r;
        }
    }
    if(x2!==x1)
    {
        if(x2>x1)
        {
            x1+=r;
            x2-=r;
        }
        else
        {
            x1-=r;
            x2+=r;
        }
    }
    if(context.getImageData((x1+x2)/2, (y1+y2)/2, 1, 1).data[0]!==0)
    {
        //alert(1);
        context.textAlign="right";
        context.font = "20px Arial";
        if(Math.abs(x2-x1)>Math.abs(y2-y1))
        {
            y1+=r/2;
            y2+=r/2;
        }
        else
        {
            x1-=r/3;
            x2-=r/3;
        }
    }
    if(context.getImageData((x1+x2)/2, (y1+y2)/2, 1, 1).data[0]!==0)
    {
    
        y1-=r/2;
        y2-=r/2;
    }
    line(context,x1,y1,x2,y2);
    
    
    context.fillText(text, (x1+x2)/2, (y1+y2)/2);
}
function krugText(context,x,y,color,fon,text,text2)
{
    krug(context,x,y,color,fon);
    context.fillStyle="black";
    context.font = "16px Arial";
    context.textAlign="center";
    context.fillText(text, x, y);
    context.fillStyle = "rgb(150,150,150)";
    context.fillText(text2, x, y+16);
}
function vershina(context,a,i)
{
    var color="red";
    var fon="rgb(234,164,164)";
    if(a.obr)
    {
        color="black";
        fon="rgb(235,235,235)";
    }
    if(a.start)
    {
        color="green";
        fon="rgb(175,234,164)";
    }
    var text=a.dlina;
    if(a.dlina===Infinity)
    {
        text="∞";
    }
    krugText(context,a.x,a.y,color,fon,text,"#"+i);
}
function rebro(context,a,b,r)
{
    lineText(context,a.x,a.y,b.x,b.y,r);
}
function marshrut(context,a)
{
    console.log(1);
    context.beginPath();
    context.lineWidth=3;
    context.globalAlpha=0.5;
    context.strokeStyle="green";
    context.moveTo(m[a[0]].x,m[a[0]].y);
    for(var i in a)
    {
        context.lineTo(m[a[i]].x,m[a[i]].y);
    }
    context.stroke();
}
function otrisovka(context,m)
{
    context.clearRect(0, 0, 1200, 700);
    for(var i in m)
    {
        vershina(context,m[i],i);
        for(var i2 in m[i].puti)
        {
            rebro(context,m[i],m[i2],m[i].puti[i2]);
        }
    }
}
m={"1":{"puti":{"2":10,"4":1},"x":100,"y":100,"dlina":null,"obr":false,"best":null,"start":false},"2":{"puti":{"1":3,"3":20,"7":2},"x":200,"y":200,"dlina":null,"obr":false,"best":null,"start":false},"3":{"puti":{"2":1,"6":30,"7":1,"8":5},"x":300,"y":400,"dlina":null,"obr":false,"best":null,"start":false},"4":{"puti":{"1":2,"5":10,"6":3},"x":100,"y":400,"dlina":null,"obr":false,"best":null,"start":false},"5":{"puti":{"4":1,"6":1},"x":100,"y":600,"dlina":null,"obr":false,"best":null,"start":false},"6":{"puti":{"3":5,"4":10,"5":1,"8":1},"x":300,"y":600,"dlina":null,"obr":false,"best":null,"start":false},"7":{"puti":{"2":5,"8":5},"x":400,"y":200,"dlina":null,"obr":false,"best":null,"start":false},"8":{"puti":{"3":1,"6":30,"7":5},"x":600,"y":400,"dlina":null,"obr":false,"best":null,"start":false}}
function sbros()
{
    for(var i in m)
    {
        m[i].dlina=Infinity;
        m[i].obr=false;
        m[i].start=false;
    }
}
function d(m,a,kvo)
{
    //console.log(a);
    var rez=[];
    a=m[a];
    if(kvo[0]>0)
    {
        kvo[0]--;
        kvo[1]++;
    }
    else
    {
        return rez;
    }
    if(a.obr)
    {
        return rez;
    }
    for(var i in a.puti)
    {
        if(m[i].dlina>a.dlina+a.puti[i])
        {
            m[i].dlina=a.dlina+a.puti[i];
            m[i].obr=false;
            rez.push(i);
            m[i].best=a.best.concat([i])
        }
    }
    a.obr=true;
    return rez;
}
function findAll(v,t_kvo)
{
    var rez={};
    sbros();
    m[v].dlina=0;
    m[v].best=[v];
    m[v].start=true;
    var kvo=[t_kvo,0];
    var t2=d(m,v,kvo);
    var t=null;
    while(t2.length>0)
    {
        t=t2;
        t2=[];
        for(var i in t)
        {
            t2.push.apply(t2,d(m,t[i],kvo));
        }
    }
    rez.kvo=kvo[1];
    rez.m={};
    for(var i in m)
    {
        rez.m[i]={"dlina":m[i].dlina,"best":m[i].best};
    }
    return rez;
}
function poehali(v,t_kvo)
{
    var canvas = document.getElementById("canvas");
    var context = canvas.getContext("2d");
    if(v!==undefined)
    {
        var marsh=findAll(v,t_kvo);
    }
    //console.log(marsh);
    otrisovka(context,m);
}
document.getElementById("knopka").onclick=function()
{
    if(document.getElementById("csv").value.trim()==="")
    {
        return;
    }
    var txt=document.getElementById("csv").value.split("\n");
    m={};
    for(var i=0;i<txt.length;i++)
    {
        if(txt[i].trim()!=="")
        {
            txt[i]=txt[i].split("\t");
            if(txt[i][0].trim()!=="")
            {
                m[txt[i][0]]={"puti":txt[i].slice(1,txt[i].length-2),"x":txt[i][txt[i].length-2]*1,"y":txt[i][txt[i].length-1]*1,"dlina":Infinity,"obr":false,"best":null,"start":false};
            }
        }
    }
    for(var i in m)
    {
        var tp={};
        for(var i2 in m[i].puti)
        {
            if(m[i].puti[i2]!=="")
            {
                if((m[i].puti[i2]*1>0)||(!document.getElementById("nuli_checkbox").checked))
                {
                    tp[Object.keys(m)[i2]]=m[i].puti[i2]*1;
                }
                
            }
        }
        m[i].puti=tp;
    }
    console.log(JSON.stringify(m));
    poehali(Object.keys(m)[0],Infinity);
    perebor();
}
document.getElementById("knopka_poehali").onclick=function()
{
    console.log(document.getElementById("user_kvo").value*1);
    poehali(Object.keys(m)[0],document.getElementById("user_kvo").value*1);
    document.getElementById("user_kvo").value=document.getElementById("user_kvo").value*1+1;
}
function perebor()
{
    var spisok=document.getElementById("spisok");
    spisok.innerHTML="";
    spisok.appendChild(document.createElement("table"));
    var t=spisok.children[0];
    t.border=1;
    t.appendChild(document.createElement("tr"));
    t.rows[0].appendChild(document.createElement("th"));
    t.rows[0].cells[t.rows[0].cells.length-1].innerHTML="";
    for(var i in m)
    {
        t.rows[0].appendChild(document.createElement("th"));
        t.rows[0].cells[t.rows[0].cells.length-1].innerHTML=i;
    }
    for(var i in m)
    {
        t.appendChild(document.createElement("tr"));
        var ts=findAll(i,Infinity);
        t.rows[t.rows.length-1].appendChild(document.createElement("th"));
        t.rows[t.rows.length-1].cells[t.rows[t.rows.length-1].cells.length-1].innerHTML=i;
        for(var i2 in ts.m)
        {
            t.rows[t.rows.length-1].appendChild(document.createElement("td"));
            t.rows[t.rows.length-1].cells[t.rows[t.rows.length-1].cells.length-1].appendChild(document.createElement("input"));
            t.rows[t.rows.length-1].cells[t.rows[t.rows.length-1].cells.length-1].children[0].type="button";
            t.rows[t.rows.length-1].cells[t.rows[t.rows.length-1].cells.length-1].children[0].value=ts.m[i2].dlina;
            if(ts.m[i2].dlina===Infinity)
            {
                t.rows[t.rows.length-1].cells[t.rows[t.rows.length-1].cells.length-1].children[0].value="∞";
            }
            t.rows[t.rows.length-1].cells[t.rows[t.rows.length-1].cells.length-1].children[0].n=i;
            t.rows[t.rows.length-1].cells[t.rows[t.rows.length-1].cells.length-1].children[0].n2=i2;
            t.rows[t.rows.length-1].cells[t.rows[t.rows.length-1].cells.length-1].children[0].m=ts.m;
            t.rows[t.rows.length-1].cells[t.rows[t.rows.length-1].cells.length-1].children[0].onclick=function()
            {
                poehali(this.n,Infinity);
                var canvas = document.getElementById("canvas");
                var context = canvas.getContext("2d");
                otrisovka(context,m);
                if(this.value!=="∞")
                {
                    marshrut(context,this.m[this.n2].best);
                }
                
            }
        }
    }
}
function m2(tm)
{
    var canvas = document.getElementById("canvas");
    var context = canvas.getContext("2d");
    marshrut(context,tm);
}
function changeSost(text)
{
    if(text===undefined)
    {
        text="Обзор";
    }
    document.getElementById("sost").innerHTML=text;
}
document.getElementById("knopka_delete").onclick=function()
{
    var canvas = document.getElementById("canvas");
    changeSost("Выберите вершину для удаления");
    canvas.onclick=function(e)
    {
        var canvas = document.getElementById("canvas");
        var t=getMousePosition(canvas,e);
        for(var i in m)
        {
            if((Math.abs(m[i].x-t.x)<=25)&&(Math.abs(m[i].y-t.y)<=25))
            {
                for(var i2 in m)
                {
                    for(var i3 in m[i2].puti)
                    {
                        if(i===i3)
                        {
                            delete m[i2].puti[i3];
                        }
                    }
                }
                delete m[i];
            }
        }
        poehali(Object.keys(m)[0],Infinity);
        perebor();
        canvas.onclick=null;
        changeSost();
    }
}
document.getElementById("knopka_delete_svyaz").onclick=function()
{
    var canvas = document.getElementById("canvas");
    changeSost("Удаление связи. Выберите первую вершину");
    canvas.onclick=function(e)
    {
        var canvas = document.getElementById("canvas");
        var t=getMousePosition(canvas,e); 
        canvas.otkuda=null;
        for(var i in m)
        {
            if((Math.abs(m[i].x-t.x)<=25)&&(Math.abs(m[i].y-t.y)<=25))
            {
                canvas.otkuda=i;
            }
        }
        if(canvas.otkuda!==null)
        {
            changeSost("Удаление связи. Выберите вторую вершину");
            canvas.onclick=function(e)
            {
                var canvas = document.getElementById("canvas");
                var t=getMousePosition(canvas,e);
                for(var i in m)
                {
                    if((Math.abs(m[i].x-t.x)<=25)&&(Math.abs(m[i].y-t.y)<=25))
                    {
                        delete m[canvas.otkuda].puti[i];
                    }
                }
                poehali(Object.keys(m)[0],Infinity);
                perebor();
                canvas.onclick=null;
                changeSost();
            }
        }
        else
        {
            canvas.onclick=null;
            changeSost();
        }
    }
}
document.getElementById("knopka_add").onclick=function()
{
    var canvas = document.getElementById("canvas");
    changeSost("Выберите свободную область для создания вершины");
    canvas.onclick=function(e)
    {
        var canvas = document.getElementById("canvas");
        var t=getMousePosition(canvas,e);
        var svob=true;
        for(var i in m)
        {
            if((Math.abs(m[i].x-t.x)<=70)&&(Math.abs(m[i].y-t.y)<=70))
            {
                svob=false;
            }
        }
        if(svob)
        {
            var nazv="0";
            while(m[nazv]!==undefined)
            {
                nazv=(nazv*1+1)+"";
            }
            var user=prompt("Введите название вершины",nazv);
            if(user==="")
            {
                user=nazv;
            }
            if(m[user]!==undefined)
            {
                user=nazv;
            }
            m[user]={"x":t.x,"y":t.y,"puti":[],"dlina":Infinity,"obr":false,"best":null,"start":false};
        }
        poehali(Object.keys(m)[0],Infinity);
        perebor();
        canvas.onclick=null;
        changeSost();
    }
}
document.getElementById("knopka_add_svyaz").onclick=function()
{
    var canvas = document.getElementById("canvas");
    changeSost("Добавление связи. Выберите первую вершину");
    canvas.onclick=function(e)
    {
        var canvas = document.getElementById("canvas");
        var t=getMousePosition(canvas,e); 
        canvas.otkuda=null;
        for(var i in m)
        {
            if((Math.abs(m[i].x-t.x)<=25)&&(Math.abs(m[i].y-t.y)<=25))
            {
                canvas.otkuda=i;
            }
        }
        if(canvas.otkuda!==null)
        {
            changeSost("Добавление связи. Выберите вторую вершину");
            canvas.onclick=function(e)
            {
                var canvas = document.getElementById("canvas");
                var t=getMousePosition(canvas,e);
                for(var i in m)
                {
                    if((Math.abs(m[i].x-t.x)<=25)&&(Math.abs(m[i].y-t.y)<=25))
                    {
                        var pred=1;
                        if(m[canvas.otkuda].puti[i]!==undefined)
                        {
                            pred=m[canvas.otkuda].puti[i];
                        }
                        var user=prompt("Введите длину пути",pred);
                        if((user*1)>=0)
                        {
                            if(user!==null)
                            {
                                m[canvas.otkuda].puti[i]=user*1;
                            }
                        }
                    }
                }
                poehali(Object.keys(m)[0],Infinity);
                perebor();
                canvas.onclick=null;
                changeSost();
            }
        }
        else
        {
            canvas.onclick=null;
            changeSost();
        }
    }
}
document.getElementById("knopka_otmena").onclick=function()
{
    var canvas = document.getElementById("canvas");
    changeSost();
    canvas.onclick=null;
}
document.getElementById("knopka_rename").onclick=function()
{
    var canvas = document.getElementById("canvas");
    changeSost("Выберите вершину для переименования");
    canvas.onclick=function(e)
    {
        var canvas = document.getElementById("canvas");
        var t=getMousePosition(canvas,e);
        for(var i in m)
        {
            if((Math.abs(m[i].x-t.x)<=25)&&(Math.abs(m[i].y-t.y)<=25))
            {
                var name=prompt("Введите новое имя вершины",i);
                if((name!==null)&&(name.trim()!==""))
                {
                    for(var i2 in m)
                    {
                        for(var i3 in m[i2].puti)
                        {
                            if(i===i3)
                            {
                                m[i2].puti[name]=m[i2].puti[i3];
                                delete m[i2].puti[i3];
                            }
                        }
                    }
                    m[name]=m[i];
                    delete m[i];
                }
                
            }
        }
        poehali(Object.keys(m)[0],Infinity);
        perebor();
        canvas.onclick=null;
        changeSost();
    }
}
document.getElementById("knopka_move").onclick=function()
{
    var canvas = document.getElementById("canvas");
    changeSost("Выберите вершину для перемещения");
    canvas.onmousedown=function(e)
    {
        var canvas = document.getElementById("canvas");
        var t=getMousePosition(canvas,e);
        var usp=false;
        for(var i in m)
        {
            
            if((Math.abs(m[i].x-t.x)<=25)&&(Math.abs(m[i].y-t.y)<=25))
            {
                usp=true;
                changeSost("Перемещение верщины \""+i+"\". Выберите свободное место");
                canvas.v=i;
                canvas.onmouseup=function(e)
                {
                    var canvas = document.getElementById("canvas");
                    var t=getMousePosition(canvas,e);
                    /*alert(canvas.v);
                    for(var i in m)
                    {
                        
                        if((Math.abs(m[i].x-t.x)<=25)&&(Math.abs(m[i].y-t.y)<=25))
                        {
                            if(i===canvas.v)
                            {
                                return;
                                
                            }
                        }
                    }*/
                    var svob=true;
                    for(var i in m)
                    {
                        if((Math.abs(m[i].x-t.x)<=70)&&(Math.abs(m[i].y-t.y)<=70))
                        {
                            svob=false;
                        }
                    }
                    if(svob)
                    {
                        m[canvas.v].x=t.x;
                        m[canvas.v].y=t.y;
                    }
                    poehali(Object.keys(m)[0],Infinity);
                    perebor();
                    canvas.onclick=null;
                    canvas.onmousedown=null;
                    canvas.onmouseup=null;
                    changeSost();
                }
            }
        }
        if(!usp)
        {
            canvas.onmousedown=null;
            canvas.onmouseup=null;
            changeSost();
        }
    }
}
document.getElementById("knopka_save").onclick=function()
{
    var csv=document.getElementById("csv");
    csv.value="";
    for(var i in m)
    {
        csv.value+="\t"+i;
    }
    csv.value+="\tX\tY\n";
    for(var i in m)
    {
        csv.value+=i;
        for(var i2 in m)
        {
            var tr=m[i].puti[i2];
            if(tr===undefined)
            {
                tr="";
            }
            csv.value+="\t"+tr;
        }
        csv.value+="\t"+m[i].x+"\t"+m[i].y;
        csv.value+="\n";
    }
}
document.getElementById("knopka_reset").onclick=function()
{
    if(!confirm("Граф будет уничтожен"))
    {
        return;
    }
    m=[];
    poehali(Object.keys(m)[0],Infinity);
    perebor();
}