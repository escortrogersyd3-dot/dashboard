import {readFileSync} from "node:fs";
const source=readFileSync("public/preobserveros-showcase.html","utf8");
for(const value of ["Pink House · V7 离线成果展示","冻结 V7 表面重建","展示角色 · 非真实登录","01 · 待办与动态置顶","02 · 现场观察","03 · 房间与工作状态","04 · 网站预约与客服","05 · 工单与动态经营","WEEKLY · 重要日历","INSIGHT · 经营分析、建议与重点关注","HOLD_LIVE_INTEGRATION","ObserverOS 是未来唯一事实来源","camera-grid","bottomnav","DAILY","WEEKLY","INSIGHT"])if(!source.includes(value))throw new Error("missing showcase boundary: "+value);
for(const value of ["http://","https://","fetch(","<script","websocket"])if(source.toLowerCase().includes(value))throw new Error("forbidden showcase content: "+value);
console.log("Pre-ObserverOS showcase verification: PASS");
