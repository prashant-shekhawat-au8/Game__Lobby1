import React, { useState, useEffect } from 'react'
import Money from "../svg/rupee-sign-solid.svg"
import Money2 from "../svg/rupee-sign-solid2.svg"
import arrow from "../svg/arrow-up-solid.svg"
import greater from "../svg/chevron-right-solid.svg"
import people_outline from "../svg/people_outline.svg"
import people_outline_white from "../svg/people_outline_white.svg"
import peoples_outline_white from "../svg/groups_white_24dp.svg"
import peoples_outline_black from "../svg/groups_black_24dp.svg"


export const Game = () => {
    const group = {
        two: false,
        six: true
    }

    const [group_choosed, setgroup] = useState(group)

    const [data, setdata] = useState([])

    const [sort_clicked, setsort_clicked] = useState(false)

    useEffect(() => {
        (
            async () => {
                const res = await fetch("https://api.peka.ooo/api/tables?gameType=rummy")
                const data = await res.json();
                const finalData=filter_bygroup(filter_tableType(data)) 
                sort_clicked? setdata(finalData.sort((a, b)=> b.betValue-a.betValue)): setdata(finalData)
            }
        )()
    }, [group_choosed,sort_clicked])

    
    const filter_bygroup = (data) => {
        if (group_choosed.two == true) {
            let filtered_group = data.filter((value) => value.numPlayers === 2)
            return filtered_group
        } else {
            let filtered_group = data.filter((value) => value.numPlayers === 6)
            return filtered_group
        }    
    }

    const filter_tableType = (data) => {
       var filtered_tableType = data.filter((value) => value.category === "101-pool")
       return filtered_tableType  
    }

    const handleClick_two_group = () => {
        setgroup({
            two:true,
            six: false
        })
    }

    const handleClick_six_group = () => {
        setgroup({
            six: true,
            two: false
        })
    }

    const handleClick_sort = () => {
        setsort_clicked(!sort_clicked)     
    }

    return (
        <div className="game">

            <div className="category">
                <button className="table_types_clicked">101 POOL</button>
                <button className="table_types">201 POOl</button>
                <button className="table_types">DEALS</button>
                <button className="table_types">POINTS</button>
            </div>

            <div className="sorting">
                <div className="group">
                    <button className={group_choosed.two ? "two_clicked" : "two"}
                        onClick={handleClick_two_group}>2
                        <img className="people" src={group_choosed.two ? people_outline_white : people_outline} alt="rupes" /></button>
                    <button className={group_choosed.six ? "two_clicked" : "two"}
                        onClick={handleClick_six_group}>6
                        <img className="people" src={group_choosed.six ? peoples_outline_white : peoples_outline_black} alt="rupes" /></button>
                </div>

                <button className={sort_clicked?"money":"money_clicked"} onClick={handleClick_sort}>
                    <img className="money2" src={Money2} alt="rupes" />
                    <img className="arrow" src={arrow} alt="arrow" />
                </button>

                <div className="matches">
                    My Matches <img className="greater" src={greater} alt="arrow" />
                </div>
            </div>

            <div>
                {data.map((map) =>
                    <div className="cards">
                        <div className="card_white">
                            <div className="betValue">
                                <img className="rup_betValue" src={Money} alt="rupes" />{map.betValue}.0</div>
                            <div className="card_group">{map.numPlayers}
                                <img className="people" src={peoples_outline_black} alt="rupes" /></div>
                            <button className="play">PLAY</button>
                        </div>

                        <div className="card_grey bonus">
                            Bonus allowed
                        </div>
                    </div>
                )}
            </div>

        </div>
    )
}
