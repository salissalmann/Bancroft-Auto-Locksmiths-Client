import React, { useEffect, useState } from 'react';
import Navigation from '../Navigation/Navigation'
import {SiAbletonlive} from 'react-icons/si'
import "./Homepage.css"

export default function HomePage() {
    const [selectedState, setSelectedState] = useState("standard");
    const [PlateChoice, SetPlateChoice] = useState("Front and Rear");
    const [PlateText, SetPlateText] = useState("");
    const [Layout, SetLayout] = useState("standard");
    const [Font, SetFont] = useState("'Montserrat', sans-serif");
    const [FrontSize, SetFrontSize] = useState("Option1");
    const [RearSize, SetRearSize] = useState("Option1");
    const [Badge, SetBadge] = useState()
    const [BadgeCity, SetBadgeCity] = useState("")
    const [BadgeFlag, SetBadgeFlag] = useState("")
    const [BadgeBackground, SetBadgeBackground] = useState("#366CB7")
    const [Border, SetBorder] = useState("transparent")
    const [FooterText, SetFooterText] = useState("FOOTER")
    const [Vertical, SetVertical] = useState(false)
    const [ShortHand, setShortHand] = useState(false);
    const [FooterColor, SetFooterColor] = useState("black")

    const HandleFooterColor = (e) => { SetFooterColor(e.target.value); };

    const HandlePlates = (e) => { SetPlateChoice(e.target.value); };
    const HandlePlateText = (e) => {
        const plateText = e.target.value;
        SetPlateText(plateText);
    };
    const handleRadioChange = (e) => { setSelectedState(e.target.value); };
    const HandleLayout = (e) => {
        SetLayout(e.target.value);
        SetFooterColor("black")
    };
    const HandleFont = (e) => {
        SetFont(e.target.value);
    };
    const HandleFrontSize = (e) => {
        SetFrontSize(e.target.value);
        const styleOptions = {
            Option1: "PlateFront4D",
            Option2: "PlateFront4D2",
            Option3: "PlateFront4D3",
            Option4: "PlateFront4D4",
            Option5: "PlateFront4D5",
            Option6: "PlateFront4D6",
            Option7: "PlateFront4D7",
            Option8: "PlateFront4D8",
        };
        setAttribute(styleOptions[e.target.value]);
        const plateFront4D = document.getElementById(Attribute);
        if (plateFront4D) {
            plateFront4D.setAttribute("data-content", PlateText);
        }
    };
    const HandleRearSize = (e) => {
        SetRearSize(e.target.value);
        const styleOptions = {
            Option1: "PlateFront4DR",
            Option2: "PlateFront4D2R",
            Option3: "PlateFront4D3R",
            Option4: "PlateFront4D4R",
            Option5: "PlateFront4D5R",
            Option6: "PlateFront4D6R",
            Option7: "PlateFront4D7R",
            Option8: "PlateFront4D8R",
        };
        setAttribute2(styleOptions[e.target.value]);
        const plateFront4D = document.getElementById(Attribute2);
        if (plateFront4D) {
            plateFront4D.setAttribute("data-content", PlateText);
        }
    };
    const HandleBadgeBg = (e) => { SetBadgeBackground(e.target.value) };
    const HandleBorder = (e) => { SetBorder(e.target.value) };
    const HandleBadge = (e) => {
        SetBadge(e.target.value);
        if (e.target.value !== "") {
            const [flag, city] = e.target.value.split('-');
            if (flag.endsWith('P')) {
                SetVertical(true)
            }
            else {
                SetVertical(false)
            }
            if (city.length > 4) {
                setShortHand(true)
            } else {
                setShortHand(false)
            }
            SetBadgeCity(city);
            SetBadgeFlag(flag.replace("P", ""));
        }
        if (e.target.value === "") {
            SetBadge("")
            SetBadgeCity("");
            SetBadgeFlag("");
        }
    };
    const HandleFooter = (e) => { SetFooterText(e.target.value) }
    const ResetBc = () => { SetBorder("transparent") }
    const ResetBg = () => { SetBadgeBackground("#366CB7") }
    const [Attribute, setAttribute] = useState("PlateFront4D");
    const [Attribute2, setAttribute2] = useState("PlateFront4DR");

    useEffect(() => {
        const plateFront4D = document.getElementById(Attribute);
        if (plateFront4D) {
            plateFront4D.setAttribute("data-content", PlateText);
        }
        const plateFront4D2 = document.getElementById(Attribute2);
        if (plateFront4D2) {
            plateFront4D2.setAttribute("data-content", PlateText);
        }

    })

    return (
        <>
            <Navigation />
            <Cover />


            <div className='container my-2' id="Grid">
                <div className="GridItem1">
                    <div className='Tagline1'>
                        <h5>Let's Make Your Number Plate</h5>
                    </div>
                    <div className="AddPlateText">
                        <input required type="text" placeholder="Registration " name="PlateText" className="PlateText" label="PlateText" onChange={HandlePlateText} />
                    </div>
                    <div className="Radio-Holder">
                        <div className="radio-inputs">
                            <label className="radio">
                                <input
                                    type="radio"
                                    name="radio"
                                    value="standard"
                                    checked={selectedState === 'standard'}
                                    onChange={handleRadioChange}
                                />
                                <span className="name">Standard</span>
                            </label>
                            <label className="radio">
                                <input
                                    type="radio"
                                    name="radio"
                                    value="4d"
                                    checked={selectedState === '4d'}
                                    onChange={handleRadioChange}
                                />
                                <span className="name">4D Plate</span>
                            </label>
                        </div>
                    </div>
                    <div className='Plate-Builder'>
                        <div className="Bulder-Bar">
                            <SiAbletonlive/>
                            <h5>Choose Style</h5>
                        </div>



                    </div>



                </div>

                <div className="GridItem2">
                    2
                </div>



            </div>





        </>
    )
}



const Cover = () => {
    return (
        <>
            <div id="Cover-Holder">
                <img src="/Cover.png" alt="Cover"></img>
            </div>

        </>
    )
}