// roteiro de teste automático (só roda com #teste=cena no endereço). Não afeta o jogo normal.
(function(){const Q=window.__CQ;const cena=(location.hash.split('=')[1]||'').split('&')[0];
 const log=m=>console.log('TESTE: '+m);window.addEventListener('error',e=>log('ERRO '+e.message+' @'+e.lineno));
 const run=(n)=>{for(let i=0;i<n;i++)Q.update(.05)};const later=(ms,f)=>setTimeout(()=>{try{f()}catch(e){log('ERRO '+e.message+' '+e.stack)}},ms);
 Q.G.money=500;Q.G.day=6;Q.G.day=8;Q.G.lv={cheese:1,salad:1,bacon:1,fries:1,drink:1,decor:1,hotdog:1,pizza:1,sorvete:1,bolo:1,board:4,tables:4,suco:1,pastel:1,milkshake:1,acai:1};Q.G.fuel=12;if(['salao','placa','mobilia','ampliado'].includes(cena))Q.G.lv={cheese:1,salad:1,bacon:1,fries:1,drink:1,decor:1};Q.G.stock={pao:20,carne:3,queijo:8,salada:5,bacon:5,batata:4,refri:9,salsicha:9,massa:3,sorvete:6,bolo:7,laranja:8,pastel:8,leite:8,acai:8};
 if(cena==='conv'){later(300,()=>{Q.NET.on.list=m=>{log('salas '+m.rooms.length);sessionStorage.setItem('cqGuest',JSON.stringify({code:m.rooms[0].code,name:m.rooms[0].name,host:m.rooms[0].host,G:null}));Q.NET.on.peek=p=>{const g=JSON.parse(sessionStorage.getItem('cqGuest'));g.G=p.G;sessionStorage.setItem('cqGuest',JSON.stringify(g));sessionStorage.setItem('cqAuto','1');history.replaceState(null,'',location.pathname);location.reload()};Q.netSend({t:'peek',code:m.rooms[0].code})};Q.netSend({t:'list'})});return}
 if(cena==='perf'){later(300,()=>{Q.startDay();Q.setState('play');for(let i=0;i<4;i++)Q.spawn();run(200);const R=Q.R,S=Q.S;let me=0,sk=0,sh=0,li=0,inst=0,tris=0;S.traverse(o=>{if(o.isMesh){me++;if(o.isSkinnedMesh)sk++;if(o.castShadow)sh++;if(o.isInstancedMesh)inst++}if(o.isLight)li++});R.info.autoReset=true;R.render(S,Q.cam||S.children.find(c=>c.isCamera)||null);{const tri=o=>{const g=o.geometry;if(!g)return 0;const n=g.index?g.index.count/3:g.attributes.position.count/3;return n*(o.isInstancedMesh?o.count:1)};const bt={};const top=o=>{let p=o;while(p.parent&&p.parent!==S)p=p.parent;return p};S.traverse(o=>{if(!o.isMesh)return;const k=o.isInstancedMesh?'IN '+o.geometry.type+' x'+o.count+' per'+Math.round(tri(o)/o.count)+' parent:'+(o.parent&&o.parent.type)+' pos'+top(o).position.x.toFixed(0)+','+top(o).position.z.toFixed(0):(o.isSkinnedMesh?'SK ':'')+(top(o).name||top(o).type)+'/'+(o.name||'').slice(0,20)+' '+o.geometry.type;bt[k]=(bt[k]||0)+tri(o)});Object.entries(bt).sort((a,b)=>b[1]-a[1]).slice(0,25).forEach(([k,v])=>log('T '+Math.round(v)+' '+k));const lt=[];S.traverse(o=>{if(o.isLight)lt.push(o.type+(o.castShadow?'*':''))});log('L '+lt.join(','))}{Q.charCull&&Q.charCull();const cm=Q.cam;for(const f of[40,70,100,170,2000]){cm.far=f;cm.updateProjectionMatrix();R.render(S,cm);log('far '+f+' calls '+R.info.render.calls+' tris '+R.info.render.triangles)}cm.far=170;cm.updateProjectionMatrix();{let nf=0,nft=0,vis=0;const fr=new Q.THREE_F();cm.updateMatrixWorld();fr.setFromProjectionMatrix(cm.projectionMatrix.clone().multiply(cm.matrixWorldInverse));const tri=o=>{const g=o.geometry;const n=g.index?g.index.count/3:g.attributes.position.count/3;return n*(o.isInstancedMesh?o.count:1)};S.traverseVisible(o=>{if(!o.isMesh)return;vis++;if(!o.frustumCulled){nf++;nft+=tri(o)}});log('visiveis '+vis+' semCull '+nf+' trisSemCull '+nft)}{const per=new Map();const fr2=new Q.THREE_F();Q.cam.updateMatrixWorld();fr2.setFromProjectionMatrix(Q.cam.projectionMatrix.clone().multiply(Q.cam.matrixWorldInverse));S.children.forEach(c=>{let n=0;c.traverseVisible(o=>{if(o.isMesh&&(!o.frustumCulled||fr2.intersectsObject(o)))n++});if(n)per.set(c,n)});[...per].sort((a,b)=>b[1]-a[1]).slice(0,15).forEach(([c,n])=>log('G '+n+' '+c.type+' '+(c.name||'')+' sk'+(()=>{let k=0;c.traverse(o=>{if(o.isSkinnedMesh)k++});return k})()+' pos '+c.position.x.toFixed(1)+','+c.position.z.toFixed(1)+' kids '+c.children.length));log('top '+S.children.length)}log('campos '+cm.position.toArray().map(v=>v.toFixed(1)))}log('calls '+R.info.render.calls+' tris '+R.info.render.triangles+' meshes '+me+' skinned '+sk+' shadowcast '+sh+' lights '+li+' inst '+inst+' tex '+R.info.memory.textures+' geo '+R.info.memory.geometries+' pr '+R.getPixelRatio()+' shadowmap '+R.shadowMap.enabled)});return}
 if(cena==='mteste'){later(300,()=>{if(!(localStorage.getItem('chapaQuenteLobbies')||'').includes('"teste"')){Q.showMenuX();document.getElementById('mteste').click();return}later(2500,()=>log('mapa teste dinheiro='+Q.G.money+' dia='+Q.G.day+' estado='+Q.getState()))});return}
 if(cena==='menu'){later(300,()=>Q.showMenuX());return}if(cena==='avatar'){later(300,()=>Q.showAvatar());return}if(cena==='criar'){later(300,()=>Q.showCreate());return}
 later(300,()=>{
  Q.startDay();if(cena==='pausa'){later(500,()=>Q.pauseX());return}if(cena==='extra'||cena==='extrapausa'){Q.setT(.2);run(10);if(cena==='extrapausa')later(500,()=>Q.pauseX());return}if(location.hash.includes('online'))Q.netHostT();if(cena==='chapa'){const P=Q.player;const y=parseFloat(location.hash.split('y=')[1]||0);P.pos.set(-1.5,.08,-1.9);P.yaw=P.face=y;P.pitch=-.35;run(10);later(1500,()=>run(3));return}if(cena==='porta'){const P=Q.player;const lg=location.hash.includes('longe');P.pos.set(lg?-3.2:-6.6,.08,lg?-2.6:-3.25);P.yaw=P.face=lg?-Math.PI/2+.25:-Math.PI/2+.5;P.pitch=-.3;run(30);later(1500,()=>{run(5);log('porta ang '+Q.bDoorX().rotation.y.toFixed(2))});return}const P=Q.player;
  if(cena==='ajudantes'||cena==='agencia'){if(cena==='agencia'){P.pos.set(86,.08,15);P.yaw=P.face=0;P.pitch=-.2;run(10);return}
   Object.assign(Q.G.lv,{helper:1,hchef:2,hmont:2,hfry:1,hmach:1,hgarcom:2,hclean:1,hdrive:1});Object.assign(Q.G.stock,{pao:60,carne:60,batata:20,massa:8});Q.refreshStations();Q.buildHelpers(true);log('ajudantes '+Object.keys(Q.H).join(','));
   const sp=Q.seats()[0];if(sp)Q.makeDirty(sp,{burger:true});Q.addSpill(-2,3);
   let t=0;for(let i=0;i<1600;i++){Q.update(.05);if(i%160===0)Q.spawn()}
   const ds=Q.dayStats();log('ok='+ds.ok+' perdidos='+ds.lost+' limpos='+ds.clean+' drive='+(ds.drive||0)+' sujos='+Q.dirtyCount()+' estoque pao='+Q.G.stock.pao+' carne='+Q.G.stock.carne);
   P.pos.set(0,.08,1.6);P.yaw=P.face=Math.PI;P.pitch=-.3;run(4);later(1200,()=>run(2));return}
  if(cena==='mesa'){
   const seats=Q.seats();log('assentos='+seats.length);
   for(let i=0;i<3;i++){Q.spawn();const c=Q.customers()[i];c.order={burger:true,cheese:true,salad:i==1,bacon:i==2,drink:i!=1,fries:i!=0};c.seatRes=seats[[0,1,3][i]];c.seatRes.busy=true;c.state='wait';Q.served(c);c.m.position.copy(c.sitP);c.m.position.y=.08;c.path=[];Q.sitDown(c)}
   Q.makeDirty(seats[4],{drink:1,fries:1});Q.addSpill(1.2,3.2);Q.holdMop(true);
   P.pos.set(-2.0,.08,1.6);P.yaw=.5;P.face=.9;P.pitch=-.38;
   later(2500,()=>{run(70);log('estado clientes='+Q.customers().map(c=>c.state+':'+c.m.userData.curName).join(','));log('sujeira='+Q.dirtyCount())})}
  else if(cena==='comendo'){
   const seats=Q.seats();Q.spawn();const c=Q.customers()[0];c.order={burger:true,cheese:true,salad:true,bacon:true,drink:true,fries:true};c.seatRes=seats[0];c.seatRes.busy=true;Q.served(c);c.m.position.copy(c.sitP);c.path=[];Q.sitDown(c);
   P.pos.set(-4.6,.08,3.3);P.yaw=2.4;P.face=2.4;P.pitch=-.2;Q.esther().visible=false;
   later(2000,()=>{run(60);log('comendo '+c.state);c.m.userData.eatT=.45;c.eatT=12;run(9)});
   later(4000,()=>{Q.setState('x');const cp=c.m.position;Q.cam.position.set(cp.x+.9,1.25,cp.z-1.1);Q.cam.lookAt(cp.x+.1,.95,cp.z+.1)})}
  else if(cena==='lanche'){Q.burgerSet({patty:true,cheese:true,salad:true,bacon:true});Q.setReady(2,2);
   P.pos.set(0,.08,-2.6);later(1500,()=>{Q.setState('x');Q.cam.position.set(.55,1.55,-1.45);Q.cam.lookAt(0,1.12,-.8)})}
  else if(cena==='cozinha'){Q.setReady(2,2);P.pos.set(.5,.08,-2.4);P.yaw=Math.PI;P.face=Math.PI;P.pitch=-.45;
   later(500,()=>{Q.act('grill');Q.act('grill');Q.act('pao')})}
  else if(cena==='salao'){log('furn='+JSON.stringify(Q.G.furn.map(f=>f.t)));log('assentos='+Q.seats().length+' ok='+Q.seats().filter(s=>s.ok).length);
   for(let i=0;i<4;i++)Q.spawn();run(400);log('clientes='+Q.customers().map(c=>c.state).join(','));
   for(const c of Q.customers().filter(c=>c.state==='wait').slice(0,3)){c.seatRes=null;const fr=Q.seats().filter(s=>!s.busy);c.seatRes=fr[0];if(fr[0])fr[0].busy=true;Q.served(c)}
   run(300);log('depois de servir='+Q.customers().map(c=>c.state).join(','));
   later(800,()=>{Q.setState('x');Q.cam.position.set(5.5,2.6,4.3);Q.cam.lookAt(-5,1.4,0.5)})}
  else if(cena==='placa'){Q.G.stock.carne=0;Q.G.stock.queijo=2;run(2);later(800,()=>{Q.setState('x');Q.cam.position.set(-4.2,2.1,-.2);Q.cam.lookAt(-7,2.3,-.25)})}
  else if(cena==='mobilia'){Q.toggleEdit();P.pos.set(-3,.08,2.2);P.face=0;P.yaw=0;run(2);const t=Q.target();log('alvo='+(t&&t.kind)+' '+(t&&t.f&&t.f.t));
   Q.interact();log('segurando='+(Q.EDIT.held&&Q.EDIT.held.t));P.pos.set(3.5,.08,1.0);P.face=Math.PI/2;run(2);log('ok em lugar ruim (porta/fila)? '+Q.EDIT.ok);
   P.pos.set(-1.5,.08,1.6);P.face=Math.PI/2;run(2);log('ok perto da fila='+Q.EDIT.ok+' pos='+Q.EDIT.held.x+','+Q.EDIT.held.z);
   P.pos.set(.6,.08,3.6);P.face=Math.PI/2;run(2);log('ok novo lugar='+Q.EDIT.ok+' pos='+Q.EDIT.held.x+','+Q.EDIT.held.z);Q.interact();log('colocado, segurando='+!!Q.EDIT.held);
   log('assentos='+Q.seats().length);
   later(800,()=>{Q.setState('x');Q.cam.position.set(4.5,3.2,4.4);Q.cam.lookAt(-2,0.6,2.5)})}
  else if(cena==='ampliado'){Q.G.money=5000;const u=Q.UP.find(x=>x.id==='exp');Q.G.lv.exp=3;Q.refreshStations();for(let i=0;i<3;i++)Q.addTableSet(false);Q.addTableSet(true);Q.addTableSet(true);Q.G.lv.patio=1;Q.refreshStations();
   log('FZ,RX='+Q.getFZ()+' furn='+Q.G.furn.length+' assentos='+Q.seats().length+' ok='+Q.seats().filter(s=>s.ok).length);
   const ps=Q.G.furn.filter(f=>f.t==='mesa').map(f=>f.x.toFixed(2)+','+f.z.toFixed(2));log('mesas '+ps.join(' | '));
   for(let i=0;i<4;i++)Q.spawn();run(500);log('clientes='+Q.customers().map(c=>c.state).join(','));Q.setState('play');
   later(800,()=>{Q.setState('x');Q.cam.position.set(6,9,18);Q.cam.lookAt(4,0,1)})}
  else if(cena==='loja'){P.pos.set(-25.1,.08,7.0);P.yaw=Math.PI;P.face=Math.PI;P.pitch=-.1}
  else if(cena==='lojas'){P.pos.set(-2,.08,12.5);P.yaw=Math.PI*.82;P.face=P.yaw;P.pitch=.05}
  else if(cena==='menuloja'){P.pos.set(-25.1,.08,4.0);later(800,()=>Q.openShop(Q.SHOPS[1]))}
  else if(cena==='controles'){later(500,()=>{Q.setState('pause');Q.showControls(()=>{})})}
  else if(cena==='cardapio'){Q.burgersSet([{patty:true,cheese:true,salad:false,bacon:false},{patty:true,cheese:true,salad:true,bacon:true},{patty:false,cheese:false,salad:false,bacon:false},{patty:true,cheese:false,salad:false,bacon:true}]);
   Q.MACH.hotdog.ready=3;Q.MACH.pizza.ready=6;Q.MACH.sorvete.ready=2;Q.MACH.bolo.ready=3;Q.setReady(2,2);P.pos.set(.2,.08,-2.5);
   later(1500,()=>{Q.setState('x');Q.cam.position.set(-.3,2.5,1.2);Q.cam.lookAt(-.6,1.0,-3.2)})}
  else if(cena==='forno'){Q.MACH.pizza.ready=6;Q.MACH.hotdog.ready=2;Q.MACH.pizza.on=true;P.pos.set(-4.2,.08,-2.8);later(1500,()=>{Q.setState('x');Q.cam.position.set(-3.6,1.9,-2.2);Q.cam.lookAt(-5.6,1.0,-4.4)})}
  else if(cena==='deck'){const seats=Q.seats();const ds=seats.filter(s=>s.x>8);log('assentos deck='+ds.length);
   for(let i=0;i<4;i++){Q.spawn();}const cs=Q.customers();for(let i=0;i<Math.min(4,cs.length);i++){const c=cs[i];c.order={burger:i%2==0,cheese:true,hotdog:i==1,pizza:i==3,drink:true,sorvete:i==2,bolo:i==3};c.seatRes=ds[i];ds[i].busy=true;Q.served(c);c.m.position.copy(c.sitP);c.path=[];Q.sitDown(c)}
   Q.makeDirty(ds[5],{drink:1});P.pos.set(10.55,.08,6.6);P.yaw=Math.PI;P.face=Math.PI;P.pitch=-.35;
   later(2000,()=>{run(60);log('deck: '+Q.customers().map(c=>c.state).join(','))})}
  else if(cena==='fluxo2'){const N=Q.customers;let n=0;
   // dupla: os dois sentam na mesma mesa
   for(let k=0;k<30&&!(N().length>=2&&N()[0].partner);k++){N().slice().forEach(c=>{});Q.spawn();if(!(N()[0]&&N()[0].partner)){Q.startDay()}}
   const a=N()[0],b=a.partner;log('dupla criada: '+!!b);a.order={burger:false,hotdog:true};b.order={burger:false,pizza:true,sorvete:true};
   while((a.state!=='wait'||b.state!=='wait')&&n<3000){Q.update(.05);n++}
   Q.MACH.hotdog.ready=1;Q.deliver(a);log('A servido estado='+a.state+' mesa A='+(a.seat&&a.seat.table.x)+' reservado p/ B='+(b.pairSeat&&b.pairSeat.table.x));
   Q.MACH.pizza.ready=1;Q.MACH.sorvete.ready=1;Q.deliver(b);log('B servido estado='+b.state+' mesma mesa='+(a.seat.table===b.seat.table));
   // tábua: 5 lanches no máximo
   Q.burgersSet([]);Q.G.stock.pao=20;for(let i=0;i<6;i++)Q.act('pao');log('lanches na tábua='+document.getElementById('msg').textContent);
   Q.act('cheese');Q.act('cheese');log('após 2 queijos: msg='+document.getElementById('msg').textContent);
   // máquinas
   Q.act('hotdog');n=0;while(Q.MACH.hotdog.on&&n<200){Q.update(.05);n++}log('hotdog pronto em '+(n*.05).toFixed(1)+'s, prontos='+Q.MACH.hotdog.ready+' salsicha='+Q.G.stock.salsicha);
   Q.act('pizza');n=0;while(Q.MACH.pizza.on&&n<400){Q.update(.05);n++}log('pizza pronta em '+(n*.05).toFixed(1)+'s, fatias='+Q.MACH.pizza.ready+' massa='+Q.G.stock.massa);
   // loja com liberação por dia
   Q.G.day=2;Q.openShop(Q.SHOPS.find(s=>s.id==='doceria'));log('doceria dia2: '+[...document.querySelectorAll('#ov .shopitem')].map(e=>e.textContent.replace(/\s+/g,' ').slice(0,70)).join(' | '))}
  else if(cena==='duas'){const ang=parseFloat(location.hash.split('ang=')[1]||0);const o=Q.CHARS.olivia;Q.S.add(o);
   const c1=Q.mkChar({sex:'F',h:1.65,hair:'hair-long',hc:0x4a2c17,clothes:{shirt:'#3b82f6',sleeve:'short',pants:'#333',shoes:'#222'}}),c2=Q.mkChar({sex:'M',h:1.75,hair:'hair-simpleparted',hc:0x2a1b10,clothes:{shirt:'#10b981',sleeve:'short',pants:'#333',shoes:'#222'}});Q.S.add(c1);Q.S.add(c2);
   P.pos.set(-.9,.08,3);P.face=ang;o.position.set(-.3,.08,3);c1.position.set(.3,.08,3);c2.position.set(.9,.08,3);[o,c1,c2].forEach(g=>g.rotation.y=ang);
   later(1500,()=>{const e=Q.esther();log('esther pos '+e.position.toArray().map(v=>v.toFixed(2))+' vis '+e.visible+' olivia '+o.position.toArray().map(v=>v.toFixed(2))+' parent '+(o.parent&&o.parent.type));let nan=0;o.traverse(x=>{if(x.matrixWorld.elements.some(v=>isNaN(v)))nan++});log('nan nodes '+nan);for(const k of['F','M']){const b=Q.BASE[k];log(k+' skull '+JSON.stringify(b.skull)+' head '+JSON.stringify(b.head))}Q.esther().rotation.y=ang;Q.setState('x');const cz=location.hash.includes('perto');Q.cam.position.set(cz?-.6:0,cz?1.45:1.5,cz?3.9:4.6);Q.cam.lookAt(cz?-.6:0,cz?1.3:1.3,3)})}
  else if(cena==='cabelos'){const lado=location.hash.includes('lado');const L=[{sex:'F',h:1.65,hair:'hair-long',hc:0x4a2c17},{sex:'F',h:1.65,hair:'hair-buns',hc:0xa0412a},{sex:'M',h:1.75,hair:'hair-simpleparted',hc:0x2a1b10},{sex:'M',h:1.75,hair:'hair-buzzed',hc:0x111111,beard:1},{sex:'F',h:1.65,hair:'hair-buzzedfemale',hc:0x111111}];
   const all=[];L.forEach(o=>{all.push(Q.mkChar({...o,clothes:{shirt:'#3b82f6',sleeve:'short',pants:'#333',shoes:'#222'}}));log('ok '+o.hair)});
   all.forEach((g,i)=>{g.position.set(-2.4+i*1.2,.08,3.0);g.rotation.y=lado?Math.PI/2:0;Q.S.add(g)});P.pos.set(0,.08,-5);
   later(1500,()=>{Q.setState('x');Q.cam.position.set(0,1.55,6.0);Q.cam.lookAt(0,1.45,3)})}
  else if(cena==='carros'){P.pos.set(-16,.08,7.5);Q.cars[0].g.position.set(-6,0,11.4);Q.cars[0].v=0;Q.cars[1].g.position.set(-14,0,14.6);Q.cars[1].v=0;later(1500,()=>{Q.setState('x');Q.cam.position.set(-15.5,2.0,8.4);Q.cam.lookAt(-10.6,.8,2.6)})}
  else if(cena==='posto'){P.pos.set(-12,.08,9);Q.PC.pos.set(-24,0,5.2);Q.PC.yaw=Math.PI/2;later(1500,()=>{Q.setState('x');Q.cam.position.set(-12,4.5,13);Q.cam.lookAt(-24,1.5,1)})}
  else if(cena==='dirigir'){P.pos.copy(Q.PC.pos).add(Q.V(1.6,0,0));run(2);log('alvo a pé perto do carro='+(Q.target()&&Q.target().kind));Q.interact();log('no carro='+P.car);
   const f0=Q.G.fuel;const inp={mx:0,mz:1,lx:0,ly:0,run:0,rt:0,lt:0};for(let i=0;i<60;i++)Q.updateCar(.05,inp);log('após 3s acelerando: v='+(Q.PC.v*3.6).toFixed(0)+' km/h pos='+Q.PC.pos.toArray().map(v=>v.toFixed(1)));
   inp.mz=0;inp.mx=1;for(let i=0;i<40;i++)Q.updateCar(.05,inp);log('virando: yaw='+Q.PC.yaw.toFixed(2)+' fuel gasto='+(f0-Q.G.fuel).toFixed(3)+' L');
   inp.mx=0;inp.mz=-1;for(let i=0;i<60;i++)Q.updateCar(.05,inp);log('freando: v='+Q.PC.v.toFixed(2));
   Q.G.fuel=0;inp.mz=1;for(let i=0;i<20;i++)Q.updateCar(.05,inp);log('sem gasolina: v='+Q.PC.v.toFixed(2)+' msg="'+document.getElementById('msg').textContent+'"');
   Q.PC.v=0;Q.interact();log('saiu do carro='+!P.car);Q.G.money=100;
   // galão
   P.pos.set(Q.POSTO.pumps[0].x,.08,Q.POSTO.pumps[0].z+1.6);P.face=Math.PI;run(1);log('alvo na bomba='+(Q.target()&&Q.target().st&&Q.target().st.action));Q.interact();log('comprou galão: dinheiro='+Q.G.money);
   P.pos.copy(Q.PC.pos).add(Q.V(1.8,0,0));run(1);Q.interact();log('galão no carro: fuel='+Q.G.fuel);
   // bomba de carro
   Q.PC.pos.set(Q.POSTO.pumps[1].x,0,Q.POSTO.pumps[1].z+2.6);Q.PC.v=0;P.pos.copy(Q.PC.pos);Q.enterCar();run(1);log('alvo no carro na bomba='+Q.target().kind);Q.interact();document.querySelector('[data-l]').click();log('depois de completar: fuel='+Q.G.fuel.toFixed(1)+' dinheiro='+Q.G.money.toFixed(2))}
  else if(cena==='maquinas'){for(const k of['suco','pastel','milkshake','acai','hotdog','sorvete','bolo'])Q.MACH[k].ready=3;Q.MACH.pizza.ready=4;
   for(const k of['suco','pastel','milkshake','acai']){Q.MACH[k].ready=0;Q.act(k);}let n=0;while(Object.values(Q.MACH).some(m=>m.on)&&n<300){Q.update(.05);n++}log('prontos: '+['suco','pastel','milkshake','acai'].map(k=>k+'='+Q.MACH[k].ready).join(' ')+' estoque leite='+Q.G.stock.leite+' sorvete='+Q.G.stock.sorvete);
   P.pos.set(.3,.08,1.5);later(1500,()=>{Q.setState('x');Q.cam.position.set(0,2.4,1.6);Q.cam.lookAt(0,1,-2.6)})}
  else if(cena==='segundos'){for(let i=0;i<3;i++)Q.spawn();let n=0;while(Q.customers().filter(c=>c.state==='wait').length<2&&n<1500){Q.update(.05);n++}
   const s=Q.seats()[0];Q.spawn();const c=Q.customers().slice(-1)[0];c.order={burger:true};c.seatRes=s;s.busy=true;Q.served(c);c.m.position.copy(c.sitP);c.path=[];Q.sitDown(c);
   Q.act('pao');Q.act('grill');for(let i=0;i<40;i++)Q.update(.05);
   P.pos.set(0,.08,-2.6);P.face=0;later(2500,()=>{run(30);Q.setState('x');Q.cam.position.set(1.5,3.2,-3.4);Q.cam.lookAt(0,1.2,2)})}
  else if(cena==='olivia'){Q.setChar('olivia');Q.setState('menu')}
  else if(cena==='limpando'){const seats=Q.seats();Q.makeDirty(seats[0],{drink:1,fries:1});Q.holdMop(true);P.pos.set(-4.4,.08,3.2);P.yaw=.3;P.face=.3;P.pitch=-.3;
   later(800,()=>{run(2);log('alvo='+(Q.target()&&Q.target().kind));Q.interact();run(14);log('limpando, anim='+Q.esther().userData.curName)})}
  else if(cena==='fluxo'){const seats=Q.seats();const key=k=>{dispatchEvent(new KeyboardEvent('keydown',{code:k}));dispatchEvent(new KeyboardEvent('keyup',{code:k}))};
   Q.spawn();const c=Q.customers()[0];c.order={burger:true,cheese:false,salad:false,bacon:false,drink:false,fries:false};
   let n=0;while(c.state!=='wait'&&n<2000){Q.update(.05);n++}log('1 chegou no balcão em '+(n*.05).toFixed(1)+'s, paciência '+c.max.toFixed(0)+'s');
   Q.burgerSet({patty:true,cheese:false,salad:false,bacon:false});Q.deliver(c);log('2 entregue, estado='+c.state+' indo pra mesa');
   n=0;while(c.state!=='eat'&&n<2000){Q.update(.05);n++}log('3 sentou e começou a comer depois de '+(n*.05).toFixed(1)+'s');
   n=0;while(c.state==='eat'&&n<2000){Q.update(.05);n++}log('4 comeu por '+(n*.05).toFixed(1)+'s; mesa suja='+c.seat.table.dirty);
   n=0;while(!c.gone&&Q.customers().includes(c)&&n<3000){Q.update(.05);n++}log('5 saiu da loja; sujeira total='+Q.dirtyCount());
   // suja todas as mesas e tenta atender
   seats.forEach(s=>{if(!s.table.dirty)Q.makeDirty(s,{})});Q.spawn();const c2=Q.customers().find(x=>x!==c);c2.order={burger:true,cheese:false,salad:false,bacon:false,drink:false,fries:false};
   n=0;while(c2.state!=='wait'&&n<2000){Q.update(.05);n++}Q.burgerSet({patty:true,cheese:false,salad:false,bacon:false});Q.deliver(c2);log('6 com todas as mesas sujas, cliente2 estado='+c2.state+' msg="'+document.getElementById('msg').textContent+'"');
   const pat0=c2.pat;Q.update(1);log('7 paciência caiu '+(pat0-c2.pat).toFixed(2)+' em 1s (com sujeira '+Q.dirtyCount()+')');
   // limpa uma mesa
   const t=seats[0].table;P.pos.set(t.x-1.2,.08,t.z-.6);P.face=Math.atan2(1.2,.6);Q.update(.05);key('KeyE');log('8 sem esfregão: "'+document.getElementById('msg').textContent+'"');
   P.pos.set(6.45,.08,1.3);P.face=Math.PI;Q.update(.05);log('   alvo perto do balde='+(Q.target()&&Q.target().st&&Q.target().st.action));key('KeyE');
   P.pos.set(t.x-1.2,.08,t.z-.6);P.face=Math.atan2(1.2,.6);Q.update(.05);key('KeyE');n=0;while(Q.player.clean&&n<200){Q.update(.05);n++}log('9 limpou em '+(n*.05).toFixed(1)+'s; mesa suja='+t.dirty);
   Q.deliver(c2);log('10 depois de limpar, cliente2 estado='+c2.state);
   log('estoque pão='+Q.G.stock.pao+' carne='+Q.G.stock.carne)}
  else if(cena==='dentro'){const sh=Q.SHOPS[0];P.pos.set(sh.x+3.4,.08,sh.z+2.4);P.face=Math.PI;P.yaw=Math.PI;Q.update(.05);
   Q.storeAct(Q.stations['cart:padaria']);Q.storeAct(Q.stations['pick:padaria:0']);Q.storeAct(Q.stations['pick:padaria:1']);Q.storeAct(Q.stations['pick:padaria:3']);
   log('carrinho itens='+P.cart.items.length+' total='+P.cart.items.reduce((a,b)=>a+b.p,0));const p0=Q.G.stock.pao;
   P.pos.set(sh.x+2.5,.08,sh.z+5.5);Q.update(.05);log('tentou sair com itens: dentro='+(Math.abs(P.pos.z-sh.z)<3.9)+' msg="'+document.getElementById('msg').textContent+'"');
   P.pos.set(sh.x-1.6,.08,sh.z-1.2);P.face=-2.3;Q.update(.05);run(3);
   later(1200,()=>{Q.setState('x');Q.cam.position.set(sh.x+3.9,2.5,sh.z+3.2);Q.cam.lookAt(sh.x-1.8,1.0,sh.z-2.2);log('pão antes='+p0)})}
  else if(cena==='caixa'){const sh=Q.SHOPS[0];P.pos.set(sh.x+3.4,.08,sh.z+2.4);Q.update(.05);Q.storeAct(Q.stations['cart:padaria']);Q.storeAct(Q.stations['pick:padaria:0']);Q.storeAct(Q.stations['pick:padaria:2']);
   P.pos.set(sh.x+.5,.08,sh.z+1.4);Q.update(.05);const p0=Q.G.stock.pao;Q.storeAct(Q.stations['caixa:padaria']);later(800,()=>{log('menu caixa aberto estado='+Q.getState())});
   later(1500,()=>{Q.payCart();log('pagou: pão '+p0+' -> '+Q.G.stock.pao+', itens no carrinho='+P.cart.items.length)})}
  else if(cena==='fila'){for(let i=0;i<10;i++)Q.spawn();log('na fila='+Q.customers().filter(c=>c.slot>=0).length);run(700);
   log('estados='+Q.customers().map(c=>c.slot+':'+c.state+(c.inQ?'Q':'')).join(','));
   const c=Q.customers().find(c=>c.slot===2);Q.served(c);run(80);log('depois de atender o 3º: '+Q.customers().filter(c=>c.slot>=0).map(c=>c.slot+(c.inQ?'Q':'')).join(','));
   P.pos.set(0,.08,-1.9);P.face=0;later(800,()=>{Q.setState('x');Q.cam.position.set(4.6,2.6,4.2);Q.cam.lookAt(-1,1,.6)})}
  else if(cena==='drive'){P.pos.set(-8.9,.08,-3.6);P.face=-Math.PI/2;const c=Q.spawnDrive();c.order=[{cheese:true},{cheese:false}];let n=0;while(!c.at&&n<4000){Q.update(.05);n++}
   log('carro chegou na janela em '+(n*.05).toFixed(1)+'s, s='+c.s.toFixed(1)+' pos='+c.g.position.x.toFixed(1)+','+c.g.position.z.toFixed(1));
   Q.dSet([{patty:true,cheese:false},{patty:true,cheese:true}]);const m0=Q.G.money;Q.autoDeliver();log('entregou: dinheiro +'+(Q.G.money-m0).toFixed(2)+' out='+c.out);
   for(let i=0;i<3;i++){Q.spawnDrive();for(let k=0;k<240;k++)Q.update(.05)}run(400);log('fila drive='+Q.dcars().map(d=>d.s.toFixed(0)+(d.at?'J':'')).join(','));
   later(800,()=>{Q.setState('x');Q.cam.position.set(-18,7,6);Q.cam.lookAt(-10,.5,-4)})}
  else if(cena==='cabine'){Q.G.lv.dgrill=2;Q.refreshStations();P.pos.set(-8.6,.08,-3.6);P.face=Math.PI;Q.act('dchapa');Q.act('dchapa');Q.act('dpao');Q.act('dqueijo');Q.act('dpao');
   const c=Q.spawnDrive();let n=0;while(!c.at&&n<4000){Q.update(.05);n++}
   later(800,()=>{Q.setState('x');Q.cam.position.set(-7.6,2.3,-2.2);Q.cam.lookAt(-10.2,.9,-4.6)})}
  else if(cena==='carros'){later(800,()=>{Q.setState('x');Q.cam.position.set(18.6,1.5,6.6);Q.cam.lookAt(22.6,.7,2.2)})}
  else if(cena==='carros2'){later(800,()=>{const c=Q.cars[0];c.g.position.set(4,0,11.4);c.g.rotation.y=0;Q.setState('x');Q.cam.position.set(7.5,1.6,8.4);Q.cam.lookAt(4,.7,11.4)})}
  else if(cena==='pintura'){Q.G.paint={floor:'marmore',wall:'retro'};Q.buildShell();P.pos.set(-5,.08,3);later(800,()=>{Q.setState('x');Q.cam.position.set(5.5,2.4,4.2);Q.cam.lookAt(-4,1.2,.5)})}
  else if(cena==='tintas'){const sh=Q.SHOPS.find(s=>s.paint);P.pos.set(sh.x,.08,sh.z+6);Q.update(.05);Q.openShop(sh)}
  else if(cena==='equip'){const sh=Q.SHOPS.find(s=>s.id===(location.hash.split('&')[1]||'equip'));P.pos.set(sh.x,.08,sh.z);Q.update(.05);log('alvo='+(Q.target()&&Q.target().st&&Q.target().st.action));
   const t0=Q.PC.pos.clone();Q.PC.pos.set(4,0,-2);Q.PC.yaw=0;Q.enterCar();for(let i=0;i<80;i++)Q.updateCar(.05,{mx:0,mz:1,rt:0,lt:0});log('carro atravessou de z -2 para '+Q.PC.pos.z.toFixed(1));Q.exitCar&&0;Q.player.car=false;P.pos.set(sh.x,.08,sh.z);
   later(800,()=>{Q.setState('x');const s=sh.rot?-1:1;Q.cam.position.set(sh.x+3.6*s,2.6,sh.z+3.3*s);Q.cam.lookAt(sh.x-2*s,1,sh.z-2.5*s)})}
  else if(cena==='bate'){const D=(x,z,yaw,n,mz=1)=>{Q.PC.pos.set(x,0,z);Q.PC.yaw=yaw;Q.PC.v=0;Q.player.car=true;for(let i=0;i<n;i++)Q.updateCar(.05,{mx:0,mz,rt:0,lt:0,lx:0,ly:0});return Q.PC.pos};
   let p=D(0,0,0,0);p=D(0,11,Math.PI,80);log('contra a lanchonete: parou em z='+p.z.toFixed(2)+' (fachada 4.9)');
   p=D(-20,4,0,60);log('pela árvore (-20,9.1): chegou em z='+p.z.toFixed(1));p=D(20,4,0,60);log('pelo poste antigo/rua: z='+p.z.toFixed(1));
   p=D(-52,11,Math.PI,80);log('contra a loja de tintas: z='+p.z.toFixed(2)+' (frente 2)');
   D(22.55,2.2,0,1,0);Q.PC.cy=1.2;Q.PC.cp=.5;for(let i=0;i<40;i++)Q.updateCar(.05,{mx:0,mz:0,rt:0,lt:0,lx:0,ly:0});later(500,()=>Q.setState('x'))}
  else if(cena==='cabecas'){const L=[{sex:'F',curly:1,hc:0x120c08,skin:[1.12,.92,.8]},{sex:'F',afro:1,hc:0x110b08,skin:[.72,.56,.46]},{sex:'F',hair:'hair-long',hc:0xa0412a},{sex:'F',hair:'hair-buns',hc:0x6b3e1f},{sex:'M',hair:'hair-simpleparted',hc:0xc9a15a},{sex:'M',hair:'hair-buzzed',beard:1,hc:0x2a1b10},{sex:'F',hair:'hair-buzzedfemale',hc:0x222222}];
   const cl={shirt:'#f4f4f4',sleeve:'short',pants:'#333',shoes:'#222'};const ms=L.map((o,i)=>{const m=Q.mkChar({...o,h:1.7,clothes:cl});m.position.set(-1.65+i*.55,.08,2.0);m.rotation.y=0;Q.S.add(m);return m});
   P.pos.set(0,.08,-2.6);later(1500,()=>{Q.setState('x');Q.cam.position.set(0,1.62,3.75);Q.cam.lookAt(0,1.58,2)})}
  else if(cena==='cabeca1'){const w=(location.hash.split('&')[1]||'esther');const m=Q.CHARS[w];Q.setChar(w);P.pos.set(0,.08,2);P.face=0;P.yaw=0;Q.update(.05);Q.update(.05);
   later(1200,()=>{Q.setState('x');const e=Q.esther();e.updateMatrixWorld(true);let hp=null;e.traverse(o=>{if(o.isBone&&o.name==='Head')hp=o.getWorldPosition(Q.V())});
    const side=(location.hash.split('&')[2]||'f');const d=side==='f'?Q.V(0,.05,.75):side==='l'?Q.V(.75,.05,0):Q.V(-.35,.25,-.65);Q.cam.position.copy(hp).add(d);Q.cam.lookAt(hp.x,hp.y+.06,hp.z);e.visible=true})}
  log('cena '+cena+' pronta');
 });
})();
