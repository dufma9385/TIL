# bit coin 실습

## public/index.jsx

```react
var {Component} = React;
var {Router, Route, IndexRoute, Link} = ReactRouter;
 
class Main extends Component{
    render(){
        return(            
            <div>
                <h1>BlockChain Study</h1>
                <ul className="header" >
                    <li><Link exact to="/">Home</Link></li>
                    <li><Link to="/bitcoin">Bitcoin</Link></li>
                    <li><Link to="/ethereum">Ethereum</Link></li>
                    <li><Link to="/hyperledger">Hyperledger</Link></li>
                </ul>
                <div className="content">
                {this.props.children}
                </div>
            </div>            
        );
    }
}
 
class Home extends Component{
    render(){
        return(
            <div>
                <h2>HELLO</h2>
                <p>안녕하세요? BlockChain 노드 웹 예제(dApp)입니다. 잘해보죠~!!!</p>
            </div>
        );
    }
}
class BitcoinNetwork extends Component{
    state={
        blockNumber:0,
        acc1_balance:0,
        acc2_balance:0
    }
    
    bit_network_connect=()=>{
        axios.get('/bit_network/connect')
        .then((response)=>{
            console.log(response);
            this.setState({
                blockNumber:response.data.blockNumber,
                acc1_balance:response.data.acc1_balance,
                acc2_balance:response.data.acc2_balance
            });
            
        })
        .catch((error)=>{
            console.log(error);
        });
    }
    send=()=>{
        alert(this.amount.value);
        axios.post('/bit_network/send',{"amount":this.amount.value})
        .then((response)=>{
            console.log(response);
            this.setState({
                blockNumber:response.data.blockNumber,
                acc1_balance:response.data.acc1_balance,
                acc2_balance:response.data.acc2_balance
            });
        })
        .catch((error)=>{
            console.log(error);
        });
    }

    bit_add_account=()=>{
		alert(this.account.value);
        axios.post('/bit_network/add',{"account":this.account.value})
        .then((response)=>{
            console.log(response.data);
        })
        .catch((error)=>{
            console.log(error);
        });
    }
    render(){
        return(
            <div>
                <h2>BitcoinNetwork</h2>
                <p><button onClick={this.bit_network_connect}>연결</button></p>
                <br/>
		<input placeholder='add account' ref={ref=>this.account=ref} />
		<button onClick={this.bit_add_account}>add</button>
		<br/><br/>
                block number : {this.state.blockNumber} <br/>
                acc1 balance : {this.state.acc1_balance} <br/>
                acc2 balance : {this.state.acc2_balance} <br/>
                <br/>
                <div>acc1가 acc2에게 {' '}
                <input placeholder='송금량' ref={ref=>this.amount=ref} />BTC  {' '} 
                <button onClick={this.send}  > 보내기</button><br/>               
                </div>
            </div>
        );
    }
}
class EthereumNetwork extends Component{  
 
    render(){
        return(
            <div>
                <h2>EthereumNetwork 연결 해보세요</h2>                
            </div>
        );
    }
}
class HyperledgerNetwork extends Component{  
 
    render(){
        return(
            <div>
                <h2>HyperledgerNetwork 연결 해보세요</h2>                
            </div>
        );
    }
}
 
ReactDOM.render(
    (<Router>
        <Route path="/" component={Main} >   
            <Route path="bitcoin" component={BitcoinNetwork}/>
            <Route path="ethereum" component={EthereumNetwork} />
            <Route path="hyperledger" component={HyperledgerNetwork} />
            <IndexRoute component={Home} />
        </Route>
    </Router>)
    ,document.getElementById("root")
);
```



## server.js

```javascript
const express=require("express");
const path=require("path");
const app=express(); 

app.use(express.static(path.join(__dirname,"/public")));

app.use(express.json());
const bitcoin_network_router=require('./routes/bitcoin_network_router');
app.use('/bit_network', bitcoin_network_router);

app.listen(3000,function(){
    console.log("3000 server ready...");
});
```



## routes/bitcoin_network_router.js

```javascript
const express = require('express');
const router = express.Router();

let client;

/* GET */
router.get('/connect', async (req, res, next) =>{
    try{
        
        if(!client){
            let RpcClient=require('bitcoind-rpc-client');
            client=new RpcClient(
                {
                    user:"test",
                    pass:"test",
                    host:"127.0.0.1",
                    port:12345
                }
            );
        }
        

        let blockNumber=await client.getBlockCount();
        console.log(blockNumber);
        let balance1=await client.getBalance('acc1');
        console.log(balance1);
        let balance2=await client.getBalance('acc2');
        console.log(balance2);

        let result={
            "blockNumber":blockNumber.result,
            "acc1_balance":balance1.result,
            "acc2_balance":balance2.result
        }

        console.log(result);

        res.json(result);
    }catch(e){
        console.log(e);
        res.json({"msg":"fail"});
    }
});
  

/* POST */
router.post('/add', async(req, res, next) =>{
    try{
	let RpcClient=require('bitcoind-rpc-client');
	if(!client){
		res.json({'msg':'please connect...'});
		return;		
	}
	let account=req.body.account;
	let add=await client.getNewAddress(account);
	console.log(add);
	res.json({'msg':"success", account, add});
    }catch(e){
    	console.log(e);
	res.json({'msg':'fail'});
    }
});

router.post('/send', async (req, res, next) =>{
    try{
        let RpcClient=require('bitcoind-rpc-client');
        if(!client){
            res.json({'msg':'please connect...'});
            return;
        }
        
        let re=await client.move('acc1','acc2',req.body.amount);
        console.log(re);
        let re2=await client.generate(1);
        console.log(re2);
        let blockNumber=await client.getBlockCount();
        console.log(blockNumber);
        let balance1=await client.getBalance('acc1');
        console.log(balance1);
        let balance2=await client.getBalance('acc2');
        console.log(balance2);

        let result={
            "blockNumber":blockNumber.result,
            "acc1_balance":balance1.result,
            "acc2_balance":balance2.result
        }

        console.log(result);

        res.json(result);
    }catch(e){
        console.log(e);
        res.json({"msg":"fail"});
    }
});

module.exports = router;
```

