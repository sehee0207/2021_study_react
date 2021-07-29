import axios from "axios"
import React from "react";
import styled from "styled-components";
import classnames from "classnames"
import Champion from "../components/Champion";
import ChampionModel from "../models/ChampionModel";
import championTier from "../assets/icon-champion-p.png";
import championTierN from "../assets/icon-champion-n.png";
import ChampionTrendItem from "../components/ChampionTrendItem";
import ChampionTrendHeader from "../components/ChampionTrendHeader"
import ChampionTrendToolbar from "../components/ChampionTrendToolbar";
import ChampionTrendModel from "../models/ChampionTrendModel";


interface ChampionListProps {

}

interface ChampionListState {
    allChampions : ChampionModel[];
    champions: ChampionModel[];
    type: string;
    text: string;
    //search: string;
    trendChampions: ChampionTrendModel[];
    trendType: string;
    trendPosition: string;
}

const ChampionListPageWrapper = styled.div`
    display: flex;
    width: 1080px;
    margin: 0 auto;
    margin-top: 100px;
`

// List of champion page
export default class ChampionsList extends React.Component<ChampionListProps, ChampionListState> {
    constructor(props: ChampionListProps) {
        super(props);

        this.state = {
            allChampions: [],
            champions: [],
            type: "ALL",
            text: "",
            //search: "",

            trendChampions: [],
            trendType: "tier", //winrate, pickrate, banrate
            trendPosition: "top",
        }
    }

    async componentDidMount() {
        const response = await axios.get("http://opgg.dudco.kr/champion");
        const allChampions = response.data.map((data: any) =>
            new ChampionModel({
                id: data.id, 
                name: data.name, 
                key: data.key, 
                position: data.position,
            })
        );

        const trendChampions = await this.getTrendList("tier");
        
        this.setState({
            allChampions,
            champions: allChampions,
            trendChampions,
        });
    }

    onChangeType = (type: string) => () => {
        this.setState({
            type,
            champions: this.filterChampions(type),
            
        });
    }

    onChangeInput = (text: string) => {
        this.setState({
            text: text,
            champions: this.searchChampion(text),
        });
    }

    // 쌤코드
    // onChangeSearch = (e: ChangeEvent<HTMLInputElement>) => {
    //     const value = e.target.value;
    //     if(value != ""){
    //         const searchChamp = this.filterChampions(this.state.type).filter(champ => champ.name.includes(value));
    //         this.setState({champions: searchChamp})
    //     } else{
    //         const champions = this.filterChampions(this.state.type);
    //         this.setState({champions, search: value});
    //     }
    // }

    filterChampions = (type: string) => {
        document.querySelectorAll("input")[1].value = "";
        switch(type) {
            case "TOP":
                return this.state.allChampions.filter(c => c.position!!.indexOf("탑") > -1);
                
            case "JUG":
                return this.state.allChampions.filter(c => c.position!!.indexOf("정글") > -1);

            case "MID":
                return this.state.allChampions.filter(c => c.position!!.indexOf("미드") > -1);

            case "ADC":
                return this.state.allChampions.filter(c => c.position!!.indexOf("바텀") > -1);

            case "SUP":
                return this.state.allChampions.filter(c => c.position!!.indexOf("서포터") > -1);

            default:
                return this.state.allChampions
        }
    }

    searchChampion = (text: string) => {
        var temp;
        switch(this.state.type) {
            case "TOP":
                temp = this.state.allChampions.filter(c => c.position!!.indexOf("탑") > -1); break; 
                
            case "JUG":
                temp = this.state.allChampions.filter(c => c.position!!.indexOf("정글") > -1); break;

            case "MID":
                temp = this.state.allChampions.filter(c => c.position!!.indexOf("미드") > -1); break;

            case "ADC":
                temp = this.state.allChampions.filter(c => c.position!!.indexOf("바텀") > -1); break;

            case "SUP":
                temp = this.state.allChampions.filter(c => c.position!!.indexOf("서포터") > -1); break;

            default:
                temp = this.state.allChampions; break;
        }
        if(text === ""){
            return temp;
        }
        return temp.filter(c => c.name!!.indexOf(text) > -1);
    }

    getTrendList = async (type: string, position?: string) => {
        if(!position){
            if(type === "tier") position = "top"
            else position = "all"
        }
    
        const responseTrend = await axios.get(`http://opgg.dudco.kr/champion/trend/${type}/${position}`)
        const trendChampions = responseTrend.data.map((data: any) =>
            new ChampionTrendModel({
                id: data.id,
                rank: data.rank,
                change: data.change,
                name: data.name,
                position: data.position,
                winRate: data.winRate,
                pickRate: data.pickRate,
                banRate: data.banRate,
                tierIcon: data.tierIcon,
            })
        );
        return trendChampions;
    }

    onClickTrendType = (type: string) => async () => {
        const trendChampions = await this.getTrendList(type);
        this.setState({trendType: type, trendChampions, trendPosition: type === "tier" ? "top" : "all"});
    }

    onClickTrendPosition = (position: string) => async () => {
        const trendChampions = await this.getTrendList(this.state.trendType, position);
        this.setState({trendChampions, trendPosition: position});
    }

    render() {
        return (
            <ChampionListPageWrapper>
                <ChampionsWrapper>
                    <div className="header">
                        <div className="item-wrap">
                            <div className={classnames("item", {select: this.state.type === "ALL" })} onClick={this.onChangeType("ALL")}>전체</div>
                            <div className={classnames("item", {select: this.state.type === "TOP" })} onClick={this.onChangeType("TOP")}>탑</div>
                            <div className={classnames("item", {select: this.state.type === "JUG" })} onClick={this.onChangeType("JUG")}>정글</div>
                            <div className={classnames("item", {select: this.state.type === "MID" })} onClick={this.onChangeType("MID")}>미드</div>
                            <div className={classnames("item", {select: this.state.type === "ADC" })} onClick={this.onChangeType("ADC")}>바텀</div>
                            <div className={classnames("item", {select: this.state.type === "SUP" })} onClick={this.onChangeType("SUP")}>서포터</div>
                        </div>
                        <input type="text"placeholder="챔피언 검색 (가렌, ㄱㄹ ... )" onChange = {(e) => {this.onChangeInput(e.target.value);}}/>
                        {/* <input type="text" placeholder="챔피언 검색 (가렌, ㄱㄹ ... )" onChange={this.onChangeSearch} value={this.state.search} /> */}
                    </div>
                    <div className="list">
                        {
                            this.state.champions.map((data) =>
                                <Champion
                                    key = {data.id}
                                    id = {Number(data.id) || 0}
                                    position = {data.position || []}
                                    name = {data.name || ""}
                                />
                            )
                        }
                        {[1, 2, 3, 4, 5, 6].map(() => <div style={{width: "82px", height: 0}}/>)}
                    </div>
                </ChampionsWrapper>
                <ChampionTrendWrapper>
                    <div className="header">
                        <div>챔피언 순위</div>
                        <div className="item-wrap">
                            <div
                                className={classnames("item", {select: this.state.trendType === "tier"})} 
                                onClick={this.onClickTrendType("tier")}
                            >
                                <img src={this.state.trendType === "tier"? championTier: championTierN} alt=""/>
                                티어
                            </div>
                            <div
                                className={classnames("item", {select: this.state.trendType === "winratio"})}
                                onClick={this.onClickTrendType("winratio")}
                            >
                                승률
                            </div>
                            <div
                                className={classnames("item", {select: this.state.trendType === "pickratio"})}
                                onClick={this.onClickTrendType("pickratio")}
                            >
                                픽률
                            </div>
                            <div
                                className={classnames("item", {select: this.state.trendType === "banratio"})}
                                onClick={this.onClickTrendType("banratio")}
                            >
                                밴률
                            </div>
                        </div>
                    </div>
                    <div className="list">
                        <ChampionTrendToolbar className="list-item toolbar">
                            <div className={classnames({select: this.state.trendPosition === "all"})}  onClick={this.onClickTrendPosition("all")} hidden={this.state.trendType === "tier"}>전체</div>
                            <div className={classnames({select: this.state.trendPosition === "top"})} onClick={this.onClickTrendPosition("top")} >탑</div>
                            <div className={classnames({select: this.state.trendPosition === "jungle"})} onClick={this.onClickTrendPosition("jungle")} >정글</div>
                            <div className={classnames({select: this.state.trendPosition === "mid"})} onClick={this.onClickTrendPosition("mid")} >미드</div>
                            <div className={classnames({select: this.state.trendPosition === "adc"})} onClick={this.onClickTrendPosition("adc")} >바텀</div>
                            <div className={classnames({select: this.state.trendPosition === "support"})} onClick={this.onClickTrendPosition("support")} >서포터</div>
                        </ChampionTrendToolbar>
                        <ChampionTrendHeader className="list-item header">
                            <div>#</div>
                            <div>챔피언</div>
                            <div>승률</div>
                            <div>픽률</div>
                            <div>티어</div>
                        </ChampionTrendHeader>
                        {
                            this.state.trendChampions.map(c =>
                                <ChampionTrendItem
                                    championID={c.id}
                                    change={c.change}
                                    name = {c.name}
                                    position={c.position}
                                    win={c.winRate}
                                    pick={c.pickRate}
                                    tier={c.tierIcon}
                                    rank={c.rank}
                                />
                            )
                        }
                    </div>
                </ChampionTrendWrapper>
            </ChampionListPageWrapper>
        )
    }
}

const ChampionsWrapper = styled.div`

    border-right: 1px solid #e9eff4;
    & > .header{
        display: flex;
        background-color: white;
        justify-content: space-between;
        padding: 0 17px;
        border-bottom: 1px solid #e9eff4;

        & > .item-wrap{
            display: flex;
        }

        & > .item-wrap > .item{
            line-height: 60px;
            padding: 0 12px;
            color: rgba(0, 0, 0, .6);
            cursor: pointer;

            &.select {
                box-shadow: 0px -3px 0px 0px #5383e8 inset;
                color: #5383e8;
                font-weight: bold;
                border-bottom: 1px solid #5383e8;
            }
        }

        & > input {
            width: 200px;
            margin: 10px 0;
            padding: 0 10px;
            border: none;
            background-color: #f7f7f7;
        }
    }

    & > .list {
        width:564px;
        background-color: #f7f7f7;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        padding: 0 30px;
    }
`

const ChampionTrendWrapper = styled.div`
    flex: 1;
    background-color: white;

    & > div.header{
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid #e9eff4;

        font-weight: bold;
        font-size: 14px;
        padding: 0 20px;

        & > .item-wrap{
            display: flex;
            color: rgba(0, 0, 0, .6);

            & > .item{
                display: flex;
                align-items: center;
                position: relative;
                line-height: 60px;
                padding: 0 5px;
                margin: 0 10px;
                cursor: pointer;
            }

            & > .item > img {
                margin-right: 5px;
            }

            & > item:not(:last-child)::after {
                content: "";
                width: 1px;
                height: 20px;
                background-color: #eee;
                position: absolute;
                right: -10px;
                top: 50%;
                margin-top: -10px;
            }

            & > .item.select{
                box-shadow: 0px -3px 0px 0px #5383e8 inset;
                color: #5383e8;
            }
        }
    }

    & > .list {
        background-color: #f7f7f7;
        padding: 20px;
    }
`