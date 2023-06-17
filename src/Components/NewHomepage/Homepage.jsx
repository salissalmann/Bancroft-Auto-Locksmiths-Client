import React, { useEffect, useState , useContext} from 'react';
import Navigation from '../Navigation/Navigation'
import Footer from '../Footer/Footer';
import "./Homepage.css"
import Context from "../../Context/Context"
import {useNavigate} from "react-router-dom"

export default function HomePage() {
    const Global = useContext(Context)
    const Navigate = useNavigate()

    const [selectedState, setSelectedState] = useState("standard");
    const [PlateChoice, SetPlateChoice] = useState("Front and Rear");
    const [PlateText, SetPlateText] = useState("");
    const [Layout, SetLayout] = useState("Legal Plates");
    const [Font, SetFont] = useState("'Montserrat', sans-serif");
    const [FrontSize, SetFrontSize] = useState("Option1");
    const [RearSize, SetRearSize] = useState("Option1");
    const [Badge, SetBadge] = useState("")
    const [BadgeCity, SetBadgeCity] = useState("")
    const [BadgeFlag, SetBadgeFlag] = useState("")
    const [BadgeBackground, SetBadgeBackground] = useState("#366CB7")
    const [Border, SetBorder] = useState("transparent")
    const [FooterText, SetFooterText] = useState("Enter Footer Text")
    const [Vertical, SetVertical] = useState(false)
    const [ShortHand, setShortHand] = useState(false);
    const [FooterColor, SetFooterColor] = useState("black")

    const OrderPlacement = () =>
    {
        Global.SetOrder({
            "Type": selectedState,
            "FrontOption": FrontSize,
            "RearOption": RearSize,
            "PlateChoice": PlateChoice,
            "PlateText": PlateText,
            "Layout": Layout,
            "Font": Font,
            "FrontSize": FrontSize,
            "RearSize": RearSize,
            "Badge": Badge,
            "BadgeBackground": BadgeBackground,
            "Border": Border,
            "FooterText": FooterText,
            "Vertical": Vertical,
            "ShortHand": ShortHand,
            "FooterColor": FooterColor,
            "Total": CalculatePrice()
          });
          Navigate('/checkout')
    }

    const DisplayBought = () => {
        return (
            <>
                {(selectedState === 'standard' && PlateChoice === 'Front and Rear') &&
                    <div className="Bought">
                        <div><b>Plate Type:</b> Standard</div>
                        <div><b>FrontSize:</b> {ReturnSize(FrontSize)}</div>
                        <div><b>RearSize:</b> {ReturnSize(RearSize)}</div>
                        <div><b>Layout:</b> {Layout}</div>
                        {(Border !== "transparent") &&
                            <div><b>Border:</b> {Border}</div>
                        }
                        {Badge !== "" &&
                            <div><b>Badge:</b> {Badge}</div>
                        }
                        {Font !== "'Montserrat', sans-serif" &&
                            <div><b>Font:</b> {Font}</div>
                        }
                    </div>
                }
                {(selectedState === 'standard' && PlateChoice === 'Front Only') &&
                    <div className="Bought">
                        <div><b>Plate Type:</b> Standard</div>
                        <div><b>FrontSize:</b> {ReturnSize(FrontSize)}</div>
                        <div><b>Layout:</b> {Layout}</div>
                        {(Border !== "transparent") &&
                            <div><b>Border:</b> {Border}</div>
                        }
                        {Badge !== "" &&
                            <div><b>Badge:</b> {Badge}</div>
                        }
                        {Font !== "'Montserrat', sans-serif" &&
                            <div><b>Font:</b> {Font}</div>
                        }
                    </div>
                }
                {(selectedState === 'standard' && PlateChoice === 'Rear Only') &&
                    <div className="Bought">
                        <div><b>Plate Type:</b> Standard</div>
                        <div><b>FrontSize:</b> {ReturnSize(FrontSize)}</div>
                        <div><b>Layout:</b> {Layout}</div>
                        {(Border !== "transparent") &&
                            <div><b>Border:</b> {Border}</div>
                        }
                        {Badge !== "" &&
                            <div><b>Badge:</b> {Badge}</div>
                        }
                        {Font !== "'Montserrat', sans-serif" &&
                            <div><b>Font:</b> {Font}</div>
                        }
                    </div>
                }
                {(selectedState !== 'standard') &&
                    <div className="Bought">
                        <div><b>Plate Type:</b>4D Plate</div>
                        <div><b>FrontSize:</b> {ReturnSize(FrontSize)}</div>
                        <div><b>RearSize:</b> {ReturnSize(RearSize)}</div>
                        <div><b>Layout:</b> {Layout}</div>
                        {(Border !== "transparent") &&
                            <div><b>Border:</b> {Border}</div>
                        }
                        {Font !== "'Montserrat', sans-serif" &&
                            <div><b>Font:</b> {Font}</div>
                        }
                    </div>
                }
            </>
        )
    }

    const CalculatePrice = () => {
        let CPrice = 0
        if (selectedState === 'standard' && PlateChoice === 'Front and Rear') {
            CPrice = CPrice + GetPrices(FrontSize)
            CPrice = CPrice + GetPrices(RearSize)
            if (Layout !== "Legal Plates") {
                CPrice = CPrice + 2
            }
            if (Border !== "transparent") {
                CPrice = CPrice + 3
            }
            if (Badge !== "") {
                CPrice = CPrice + 3
            }
            if (Font !== "'Montserrat', sans-serif") {
                CPrice = CPrice + 3
            }
            return CPrice.toFixed(2);
        }
        if (selectedState === 'standard' && PlateChoice === 'Front Only') {
            CPrice = CPrice + GetPrices(FrontSize)
            if (Layout !== "Legal Plates") {
                CPrice = CPrice + 2
            }
            if (Border !== "transparent") {
                CPrice = CPrice + 3
            }
            if (Badge !== "") {
                CPrice = CPrice + 3
            }
            if (Font !== "'Montserrat', sans-serif") {
                CPrice = CPrice + 3
            }
            return CPrice.toFixed(2);
        }
        if (selectedState === 'standard' && PlateChoice === 'Rear Only') {
            CPrice = CPrice + GetPrices(RearSize)
            if (Layout !== "Legal Plates") {
                CPrice = CPrice + 2
            }
            if (Border !== "transparent") {
                CPrice = CPrice + 3
            }
            if (Badge !== "") {
                CPrice = CPrice + 3
            }
            if (Font !== "'Montserrat', sans-serif") {
                CPrice = CPrice + 3
            }
            return CPrice.toFixed(2);
        }
        if (selectedState !== 'standard') {
            CPrice = CPrice + GetPrices4D(FrontSize, RearSize)
            if (Border !== "transparent") {
                CPrice = CPrice + 3
            }
            if (Font !== "'Montserrat', sans-serif") {
                CPrice = CPrice + 3
            }
            return CPrice.toFixed(2);

        }
        return CPrice
    }
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
    const HandleFont = (e) => { SetFont(e.target.value);};
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
            Option9: "PlateFront4D9",
            Option10: "PlateFront4D10",

        };
        setAttribute(styleOptions[e.target.value]);
        const plateFront4D = document.getElementById(Attribute);
        if (plateFront4D) {
            plateFront4D.setAttribute("data-content", PlateText.sp);
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
            Option9: "PlateFront4D9R",
            Option10: "PlateFront4D10R",
            Option11: "PlateFront4D10R",
            Option12: "PlateFront4D10R",
            Option13: "PlateFront4D10R",
            Option14: "PlateFront4D10R",
            Option15: "PlateFront4D10R",
            Option16: "PlateFront4DRover",
            Option17: "PlateFront4DRover",
            Option18: "PlateFront4DRover",

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
        if (e.target.value === "None") {
            SetBadge("")
        }
        if (e.target.value !== "" && e.target.value !== "None") {
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

    const ReturnSize = (Option) => {
        const Size = {
            Option1: "Standard Size (20.5x4.4in)",
            Option2: "Standard 4x4 279mm X 203mm (11in X 8in)",
            Option3: "229mm x 76mm (9in x 3in)",
            Option4: "254mm x 76mm (10in x 3in)",
            Option5: "305mm x 76mm (12in x 3in)",
            Option6: "305mm x 152mm (12in x 6in)",
            Option7: "330mm x 111mm (13in x 4.4in)",
            Option8: "330mm x 165mm (13in x 6.5in)",
            Option9: "16in x 4.5in (16in x 4.5in)",
            Option10: "520mm x 121mm (20.5in x 4.75in)",
            Option11: "520mm x 127mm (20.5in x 5in)",
            Option12: "520mm x 140mm (20.5in x 5.5in)",
            Option13: "520mm x 152mm (20.5in x 6in)",
            Option14: "533mm x 152mm (21in x 6in)",
            Option15: "559mm x 152mm (22in x 6in)",
            Option16: "Rover 75 (635x175mm)",
            Option17: "Range Rover Sport V1 (615x150mm)",
            Option18: "Range Rover Sport V2 (560x165mm)",
        }
        return Size[Option] || ""
    }

    const ResetAll = () =>
    {
        SetRearSize("Option1");
        SetFrontSize("Option1");
        SetBadgeBackground("#366CB7");
        SetBorder("transparent");
        SetBadge("");
        SetBadgeCity("");
        SetBadgeFlag("");
        SetFooterText("Enter Footer Text");
        SetLayout("Legal Plates");
        SetFont("'Montserrat', sans-serif")
    }
    
    return (
        <>
            <Navigation />
            <Cover />

            <div className='container' id="Headline">
                <span>You have arrived at the UK's leading number </span>
                <span>your plate design builder. Want to start building your number plate?</span>
            </div>

            <div className="AddPlateText">
                <input required type="text" placeholder="Enter Registration " name="PlateText" className="PlateText" label="PlateText" onChange={HandlePlateText} />
            </div>
            <div className='container my-2' id="Grid">
                <div className="GridItem1">
                    <div className='Plate-Builder'>
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
                        {selectedState === 'standard' ? (
                            <>
                                <div className="container my-2" id='Selection-Options'>
                                    <select id='Dropdown' required onChange={HandlePlates}>
                                        <option value="Front and Rear">Front and Rear</option>
                                        <option value="Front Only">Front Only</option>
                                        <option value="Rear Only">Rear Only</option>
                                    </select>

                                    <select id='Dropdown' required onChange={HandleLayout}>
                                        <option value="">-- Select Plate Layout --</option>
                                        <option value="Custom Plates">Custom Plates</option>
                                        <option value="Legal Plates">Legal Plates</option>
                                    </select>

                                    <select id='Dropdown' required onChange={HandleFont}>
                                        <option value="">-- Select Plate Font--</option>
                                        <option value="'Montserrat', sans-serif">-- Default--</option>
                                        {Fonts.map((font, index) => (
                                            <option key={index} value={FontFamily[index]}>{font}</option>
                                        ))}
                                    </select>
                                </div>

                                {(PlateChoice === "Front and Rear" || PlateChoice === "Front Only") &&
                                    <div className="container my-2" id='Selection-Options'>
                                        <select id='Dropdown-Large' required onChange={HandleFrontSize}>
                                            <option value="">-- Select Front Plate Size--</option>
                                            <option value="Option1">Standard Size (20.5x4.4in)</option>
                                            <option value="Option2">Standard 4x4 279mm X 203mm (11in X 8in)</option>
                                            <option value="Option3">229mm x 76mm (9in x 3in)</option>
                                            <option value="Option4">254mm x 76mm (10in x 3in)</option>
                                            <option value="Option5">305mm x 76mm (12in x 3in)</option>
                                            <option value="Option6">305mm x 152mm (12in x 6in)</option>
                                            <option value="Option7">330mm x 111mm (13in x 4.4in)</option>
                                            <option value="Option8">330mm x 165mm (13in x 6.5in)</option>
                                            <option value="Option9">16in x 4.5in (16in x 4.5in)</option>
                                            <option value="Option10">520mm x 121mm (20.5in x 4.75in)</option>
                                        </select>
                                    </div>
                                }

                                {(PlateChoice === "Front and Rear" || PlateChoice === "Rear Only") &&
                                    <div className="container my-2" id='Selection-Options'>
                                        <select id='Dropdown-Large' required onChange={HandleRearSize}>
                                            <option value="">-- Select Rear Plate Size--</option>
                                            <option value="Option1">Standard Size (20.5x4.4in)</option>
                                            <option value="Option2">Standard 4x4 279mm X 203mm (11in X 8in)</option>
                                            <option value="Option3">229mm x 76mm (9in x 3in)</option>
                                            <option value="Option4">254mm x 76mm (10in x 3in)</option>
                                            <option value="Option5">305mm x 76mm (12in x 3in)</option>
                                            <option value="Option6">305mm x 152mm (12in x 6in)</option>
                                            <option value="Option7">330mm x 111mm (13in x 4.4in)</option>
                                            <option value="Option8">330mm x 165mm (13in x 6.5in)</option>
                                            <option value="Option9">16in x 4.5in (16in x 4.5in)</option>
                                            <option value="Option10">520mm x 121mm (20.5in x 4.75in)</option>
                                            <option value="Option11">520mm x 127mm (20.5in x Sin)</option>
                                            <option value="Option12">520mm x 140mm (20.5in x 5.5in)</option>
                                            <option value="Option13">520mm x 152mm (20.5in x 6in)</option>
                                            <option value="Option14">533mm x 152mm (21in x 6in)</option>
                                            <option value="Option15">559mm x 152mm (22in x 6in)</option>
                                            <option value="Option16">Rover 75 (635x175mm)</option>
                                            <option value="Option17">Range Rover Sport V1 (615x150mm)</option>
                                            <option value="Option18">Range Rover Sport V2 (560x165mm)</option>

                                        </select>
                                    </div>
                                }
                                <div className="container my-2" id='Selection-Options2'>
                                    <select id='Dropdown-Large' required onChange={HandleBadge}>
                                        <option value="">-- Select Badge --</option>
                                        <option value="None">-- None --</option>
                                        {Badges.map((badge, index) => (
                                            <option key={index} value={badge}>{badge}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="container my-2" id='Selection-Options2'>
                                    <div id='ColorPickerdiv'>
                                        <label htmlFor="ColorPicker" id="PickerLabel">Select Badge Background:</label>
                                        <input type="color" id='ColorPicker' onChange={HandleBadgeBg} />
                                    </div>
                                    <div>
                                        <button type="button" onClick={ResetBg} id="ResetButton">Set Default</button>
                                    </div>
                                </div>

                                <div className="container my-2" id='Selection-Options2'>
                                    <div id='ColorPickerdiv'>
                                        <label htmlFor="ColorPicker" id="PickerLabel">Select Plate Border Color:</label>
                                        <input type="color" style={{ marginLeft: "1.3rem" }} id='ColorPicker' onChange={HandleBorder} />
                                    </div>
                                    <div>
                                        <button type="button" onClick={ResetBc} id="ResetButton">Set Default</button>
                                    </div>
                                </div>

                                {Layout === "Custom Plates" &&
                                    <div className="container my-2" id='Selection-Options'>
                                        <input required type="text" placeholder={FooterText} name="PlateText" id="Footer" label="PlateText" onChange={HandleFooter} />
                                        <div id='ColorPickerdiv'>
                                            <label htmlFor="ColorPicker" id="PickerLabel">Footer Color:</label>
                                            <input type="color" id='ColorPicker' onChange={HandleFooterColor} />
                                        </div>
                                    </div>
                                }

                                    <div className="Centeralize1" onClick={ResetAll}>
                                        <button className="Cart-Button1">Reset</button>
                                    </div>                                    

                            </>
                        ) :
                            (
                                <>
                                    <div className="container my-2" id='Selection-Options'>
                                        <select id='Dropdown-Large' required onChange={HandleFont}>
                                            <option value="">-- Select Plate Font--</option>
                                            <option value="'Montserrat', sans-serif">-- Default--</option>

                                            {Fonts.map((font, index) => (
                                                <option key={index} value={FontFamily[index]}>{font}</option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="container my-2" id='Selection-Options'>
                                        <select id='Dropdown-Large' required onChange={HandleFrontSize}>
                                            <option value="">-- Select Front Plate Size--</option>
                                            <option value="Option1">Standard Size (20.5x4.4in)</option>
                                            <option value="Option10">520mm x 121mm (20.5in x 4.75in)</option>
                                        </select>
                                    </div>

                                    <div className="container my-2" id='Selection-Options'>
                                        <select id='Dropdown-Large' required onChange={HandleRearSize}>
                                            <option value="">-- Select Rear Plate Size--</option>
                                            <option value="Option1">Standard Size (20.5x4.4in)</option>
                                            <option value="Option2">Standard M/c (9in X 7in)</option>
                                            <option value="Option10">520mm x 121mm (20.5in x 4.75in)</option>
                                            <option value="Option11">520mm x 127mm (20.5in x Sin)</option>
                                            <option value="Option12">520mm x 140mm (20.5in x 5.5in)</option>
                                            <option value="Option13">520mm x 152mm (20.5in x 6in)</option>
                                            <option value="Option14">533mm x 152mm (21in x 6in)</option>
                                            <option value="Option15">559mm x 152mm (22in x 6in)</option>
                                            <option value="Option16">Rover 75 (635x175mm)</option>
                                            <option value="Option17">Range Rover Sport V1 (615x150mm)</option>
                                            <option value="Option18">Range Rover Sport V2 (560x165mm)</option>

                                        </select>
                                    </div>

                                    <div className="container my-2" id='Selection-Options2'>
                                        <div id='ColorPickerdiv'>
                                            <label htmlFor="ColorPicker" id="PickerLabel" >Select Plate Border Color:</label>
                                            <input type="color" id='ColorPicker' onChange={HandleBorder} />
                                        </div>
                                        <div>
                                            <button type="button" onClick={ResetBc} id="ResetButton">Reset</button>
                                        </div>
                                    </div>

                                    <div className="Centeralize1" onClick={ResetAll}>
                                        <button className="Cart-Button1">Reset</button>
                                    </div>                                    
                                    
                                </>
                            )}
                    </div>
                </div>

                <div className="GridItem2">
                    {(PlateChoice === "Front and Rear" || PlateChoice === "Front Only") && !Badge && selectedState === 'standard' && FrontSize === "Option1" &&
                        <div className="Centeralize">
                            <div className="Option1_Basic" style={{ backgroundColor: "#E7E7E7" }}>
                                <div className='Option1_Container'>
                                    {PlateText && <div className="Option1_Number" style={{ fontFamily: Font, border: `3px solid ${Border}` }}>{PlateText}</div>}
                                    {!PlateText && <div className="Option1_Number" style={{ fontFamily: Font, border: `3px solid ${Border}` }}>PREVIEW</div>}
                                    {Layout === "Legal Plates" && <p className="Option1_Footer" style={{ backgroundColor: "#E7E7E7" }}>CPD JE2 4UE</p>}
                                    {Layout === "Custom Plates" && <p className="Option1_Footer" style={{ backgroundColor: "#E7E7E7", color: FooterColor }}>{FooterText}</p>}
                                </div>
                            </div>
                        </div>
                    }
                    {(PlateChoice === "Front and Rear" || PlateChoice === "Front Only") && Badge && selectedState === 'standard' && FrontSize === "Option1" &&
                        <div className="Centeralize">
                            <div className="Option1B" style={{ backgroundColor: "#E7E7E7" }}>
                                <div className="Option1B_Container" style={{ backgroundColor: BadgeBackground }}>
                                    <img src={`/Badges/${BadgeFlag}.png`} className={Vertical ? "Option1B_Image2" : "Option1B_Image1"} alt='Badge'></img>
                                    <div id={ShortHand ? "Option1B_Text1" : "Option1B_Text2"}>{BadgeCity}</div>
                                </div>
                                <div className='Option1B_Container1'>
                                    {PlateText && <div className="Option1B_Number" style={{ fontFamily: Font, border: `3px solid ${Border}` }}>{PlateText}</div>}
                                    {!PlateText && <div className="Option1B_Number" style={{ fontFamily: Font, border: `3px solid ${Border}` }}>YOUR REG</div>}
                                    {Layout === "Legal Plates" && <p className="Option1B_Footer" style={{ backgroundColor: "#E7E7E7" }}>CPD JE2 4UE</p>}
                                    {Layout === "Custom Plates" && <p className="Option1B_Footer" style={{ backgroundColor: "#E7E7E7", color: FooterColor }}>{FooterText}</p>}
                                </div>
                            </div>
                        </div>
                    }
                    {(PlateChoice === "Front and Rear" || PlateChoice === "Front Only") && !Badge && selectedState === 'standard' && FrontSize === "Option2" &&
                        <div className="Centeralize">
                            <div className='Option2_Wrapper' style={{ backgroundColor: "#E7E7E7" }}>
                                <div className='Option2_Container' style={{ fontFamily: Font, border: `3px solid ${Border}` }}>
                                    <div className='Option2_Top'>
                                        {PlateText && <p>{PlateText.substring(0, 4)}</p>}
                                        {!PlateText && <p>REG</p>}
                                    </div>
                                    <div className='Option2_Bottom'>
                                        {PlateText && <p>{PlateText.substring(4)}</p>}
                                        {!PlateText && <p className='S2'>NO#</p>}
                                    </div>
                                    {Layout === "Legal Plates" && <p className="Option2_Footer" style={{ backgroundColor: "#E7E7E7" }}>CPD JE2 4UE</p>}
                                    {Layout === "Custom Plates" && <p className="Option2_Footer" style={{ backgroundColor: "#E7E7E7", color: FooterColor }}>{FooterText}</p>}
                                </div>
                            </div>
                        </div>
                    }
                    {(PlateChoice === "Front and Rear" || PlateChoice === "Front Only") && Badge && selectedState === 'standard' && FrontSize === "Option2" &&
                        <div className="Centeralize">
                            <div className='Option2B_Wrapper' style={{ backgroundColor: "#E7E7E7" }}>
                                <div className='Option2B_Container' style={{ fontFamily: Font, border: `3px solid ${Border}` }}>
                                    <div className='Option2B_Top'>
                                        {PlateText && <p>{PlateText.substring(0, 4)}</p>}
                                        {!PlateText && <p>REG</p>}
                                    </div>
                                    <div className='Option2B_Bottom'>
                                        <div className='Option2B_Container2' style={{ backgroundColor: BadgeBackground }}>
                                            <img src={`/Badges/${BadgeFlag}.png`} className={Vertical ? "BG_Image2" : "BG_Image1"} alt='Badge'></img>
                                            <div id={ShortHand ? "BG_Text" : "BG_Text1"}>{BadgeCity}</div>
                                        </div>
                                        <div className='Option2B_Plate'>
                                            {PlateText && <p>{PlateText.substring(4)}</p>}
                                            {!PlateText && <p>NO#</p>}
                                        </div>
                                    </div>
                                    {Layout === "Legal Plates" && <p className="Option2B_Footer" style={{ backgroundColor: "#E7E7E7" }}>CPD JE2 4UE</p>}
                                    {Layout === "Custom Plates" && <p className="Option2B_Footer" style={{ backgroundColor: "#E7E7E7", color: FooterColor }}>{FooterText}</p>}
                                </div>
                            </div>
                        </div>
                    }
                    {(PlateChoice === "Front and Rear" || PlateChoice === "Front Only") && !Badge && selectedState === 'standard' && FrontSize === "Option3" &&
                        <div className="Centeralize">
                            <div className="Option3" style={{ backgroundColor: "#E7E7E7" }}>
                                <div className='Option3_Container'>
                                    {PlateText && <div className="Option3_Number" style={{ fontFamily: Font, border: `3px solid ${Border}` }}>{PlateText}</div>}
                                    {!PlateText && <div className="Option3_Number" style={{ fontFamily: Font, border: `3px solid ${Border}` }}>YOUR REG</div>}
                                    {Layout === "Legal Plates" && <p className="Option3_Footer" style={{ backgroundColor: "#E7E7E7" }}>CPD JE2 4UE</p>}
                                    {Layout === "Custom Plates" && <p className="Option3_Footer" style={{ backgroundColor: "#E7E7E7", color: FooterColor }}>{FooterText}</p>}
                                </div>
                            </div>
                        </div>
                    }
                    {(PlateChoice === "Front and Rear" || PlateChoice === "Front Only") && Badge && selectedState === 'standard' && FrontSize === "Option3" &&
                        <div className="Centeralize">
                            <div className="Option3B" style={{ backgroundColor: "#E7E7E7" }}>
                                <div className="Option3B_Container" style={{ backgroundColor: BadgeBackground }}>
                                    <img src={`/Badges/${BadgeFlag}.png`} className={Vertical ? "SIZE3_Image2" : "SIZE3_Image1"} alt='Badge'></img>
                                    <div id={ShortHand ? "SIZE3_Text1" : "SIZE3_Text2"}>{BadgeCity}</div>
                                </div>
                                <div className='BG_Container2'>
                                    {PlateText && <div className="SIZE3_Number" style={{ fontFamily: Font, border: `3px solid ${Border}` }}>{PlateText}</div>}
                                    {Layout === "Legal Plates" && <p className="SIZE3_Footer" style={{ backgroundColor: "#E7E7E7" }}>CPD JE2 4UE</p>}
                                    {Layout === "Custom Plates" && <p className="SIZE3_Footer" style={{ backgroundColor: "#E7E7E7", color: FooterColor }}>{FooterText}</p>}
                                </div>
                            </div>
                        </div>

                    }

                    {(PlateChoice === "Front and Rear" || PlateChoice === "Front Only") && !Badge && selectedState === 'standard' && FrontSize === "Option4" &&
                        <div className="Centeralize">
                            <div className="SIZE4" style={{ backgroundColor: "#E7E7E7" }}>
                                <div className='BG_Container2'>
                                    {PlateText && <div className="SIZE4_Number" style={{ fontFamily: Font, border: `3px solid ${Border}` }}>{PlateText}</div>}
                                    {!PlateText && <div className="SIZE4_Number" style={{ fontFamily: Font, border: `3px solid ${Border}` }}>YOUR REG</div>}
                                    {Layout === "Legal Plates" && <p className="SIZE4_Footer" style={{ backgroundColor: "#E7E7E7" }}>CPD JE2 4UE</p>}
                                    {Layout === "Custom Plates" && <p className="SIZE4_Footer" style={{ backgroundColor: "#E7E7E7", color: FooterColor }}>{FooterText}</p>}
                                </div>
                            </div>
                        </div>
                    }
                    {(PlateChoice === "Front and Rear" || PlateChoice === "Front Only") && Badge && selectedState === 'standard' && FrontSize === "Option4" &&
                        <div className="Centeralize">
                            <div className="SIZE4_Badge" style={{ backgroundColor: "#E7E7E7" }}>
                                <div className="BG_Container1" style={{ backgroundColor: BadgeBackground }}>
                                    <img src={`/Badges/${BadgeFlag}.png`} className={Vertical ? "SIZE3_Image2" : "SIZE3_Image1"} alt='Badge'></img>
                                    <div id={ShortHand ? "SIZE3_Text1" : "SIZE3_Text2"}>{BadgeCity}</div>
                                </div>
                                <div className='BG_Container2'>
                                    {PlateText && <div className="SIZE4_Number" style={{ fontFamily: Font, border: `3px solid ${Border}` }}>{PlateText}</div>}
                                    {Layout === "Legal Plates" && <p className="SIZE3_Footer" style={{ backgroundColor: "#E7E7E7" }}>CPD JE2 4UE</p>}
                                    {Layout === "Custom Plates" && <p className="SIZE3_Footer" style={{ backgroundColor: "#E7E7E7", color: FooterColor }}>{FooterText}</p>}
                                </div>
                            </div>
                        </div>
                    }
                    {(PlateChoice === "Front and Rear" || PlateChoice === "Front Only") && !Badge && selectedState === 'standard' && FrontSize === "Option5" &&
                        <div className="Centeralize">
                            <div className="SIZE5" style={{ backgroundColor: "#E7E7E7" }}>
                                <div className='BG_Container2'>
                                    {PlateText && <div className="SIZE5_Number" style={{ fontFamily: Font, border: `3px solid ${Border}` }}>{PlateText}</div>}
                                    {!PlateText && <div className="SIZE5_Number" style={{ fontFamily: Font, border: `3px solid ${Border}` }}>YOUR REG</div>}
                                    {Layout === "Legal Plates" && <p className="SIZE4_Footer" style={{ backgroundColor: "#E7E7E7" }}>CPD JE2 4UE</p>}
                                    {Layout === "Custom Plates" && <p className="SIZE4_Footer" style={{ backgroundColor: "#E7E7E7", color: FooterColor }}>{FooterText}</p>}
                                </div>
                            </div>
                        </div>
                    }
                    {(PlateChoice === "Front and Rear" || PlateChoice === "Front Only") && Badge && selectedState === 'standard' && FrontSize === "Option5" &&
                        <div className="Centeralize">
                            <div className="SIZE5_Badge" style={{ backgroundColor: "#E7E7E7" }}>
                                <div className="BG_Container1" style={{ backgroundColor: BadgeBackground }}>
                                    <img src={`/Badges/${BadgeFlag}.png`} className={Vertical ? "SIZE5_Image2" : "SIZE5_Image1"} alt='Badge'></img>
                                    <div id={ShortHand ? "SIZE3_Text1" : "SIZE3_Text2"}>{BadgeCity}</div>
                                </div>
                                <div className='BG_Container2'>
                                    {PlateText && <div className="SIZE5_Number" style={{ fontFamily: Font, border: `3px solid ${Border}` }}>{PlateText}</div>}
                                    {Layout === "Legal Plates" && <p className="SIZE3_Footer" style={{ backgroundColor: "#E7E7E7" }}>CPD JE2 4UE</p>}
                                    {Layout === "Custom Plates" && <p className="SIZE3_Footer" style={{ backgroundColor: "#E7E7E7", color: FooterColor }}>{FooterText}</p>}
                                </div>
                            </div>
                        </div>
                    }
                    {(PlateChoice === "Front and Rear" || PlateChoice === "Front Only") && !Badge && selectedState === 'standard' && (FrontSize === "Option6" || FrontSize === "Option8") &&
                        <div className="Centeralize">
                            <div className='S3_Wrapper' style={{ backgroundColor: "#E7E7E7" }}>
                                <div className='S3_Container' style={{ fontFamily: Font, border: `3px solid ${Border}` }}>
                                    <div className='S3_Top'>
                                        {PlateText && <p>{PlateText.substring(0, 4)}</p>}
                                        {!PlateText && <p>REG</p>}
                                    </div>
                                    <div className='S3_Bottom'>
                                        {PlateText && <p>{PlateText.substring(4)}</p>}
                                        {!PlateText && <p className='S3'>NO#</p>}
                                    </div>
                                    {Layout === "Legal Plates" && <p className="SIZE6_Footer" style={{ backgroundColor: "#E7E7E7" }}>CPD JE2 4UE</p>}
                                    {Layout === "Custom Plates" && <p className="SIZE6_Footer" style={{ backgroundColor: "#E7E7E7", color: FooterColor }}>{FooterText}</p>}
                                </div>
                            </div>
                        </div>
                    }
                    {(PlateChoice === "Front and Rear" || PlateChoice === "Front Only") && Badge && selectedState === 'standard' && (FrontSize === "Option6" || FrontSize === "Option8") &&
                        <div className="Centeralize">
                            <div className='S3_Wrapper_Badge' style={{ backgroundColor: "#E7E7E7" }}>
                                <div className='S3_Container' style={{ fontFamily: Font, border: `3px solid ${Border}` }}>
                                    <div className='S3_Top_Badge'>
                                        {PlateText && <p>{PlateText.substring(0, 4)}</p>}
                                        {!PlateText && <p>REG</p>}
                                    </div>
                                    <div className='S3_Bottom_Badge'>
                                        <div className='S3_Badge_Container' style={{ backgroundColor: BadgeBackground }}>
                                            <img src={`/Badges/${BadgeFlag}.png`} className={Vertical ? "BG_Image2" : "BG_Image1"} alt='Badge'></img>
                                            <div id={ShortHand ? "BG_Text" : "BG_Text1"}>{BadgeCity}</div>
                                        </div>
                                        <div className='S3_Badge_PlateNumber'>
                                            {PlateText && <p>{PlateText.substring(4)}</p>}
                                            {!PlateText && <p>NO#</p>}
                                        </div>
                                    </div>
                                    {Layout === "Legal Plates" && <p className="SIZE6_Footer" style={{ backgroundColor: "#E7E7E7" }}>CPD JE2 4UE</p>}
                                    {Layout === "Custom Plates" && <p className="SIZE6_Footer" style={{ backgroundColor: "#E7E7E7", color: FooterColor }}>{FooterText}</p>}
                                </div>
                            </div>
                            <div />
                        </div>
                    }
                    {(PlateChoice === "Front and Rear" || PlateChoice === "Front Only") && !Badge && selectedState === 'standard' && FrontSize === "Option9" &&
                        <div className="Centeralize">
                            <div className="Option6_NoBadge" style={{ backgroundColor: "#E7E7E7" }}>
                                <div className='BG_Container2'>
                                    {PlateText && <div className="Option6_Number" style={{ fontFamily: Font, border: `3px solid ${Border}` }}>{PlateText}</div>}
                                    {!PlateText && <div className="Option6_Number" style={{ fontFamily: Font, border: `3px solid ${Border}` }}>YOUR REG</div>}
                                    {Layout === "Legal Plates" && <p className="Option5_Footer" style={{ backgroundColor: "#E7E7E7" }}>CPD JE2 4UE</p>}
                                    {Layout === "Custom Plates" && <p className="Option5_Footer" style={{ backgroundColor: "#E7E7E7", color: FooterColor }}>{FooterText}</p>}
                                </div>
                            </div>
                        </div>
                    }
                    {(PlateChoice === "Front and Rear" || PlateChoice === "Front Only") && Badge && selectedState === 'standard' && FrontSize === "Option9" &&
                        <div className="Centeralize">
                            <div className="BG_Plate2" style={{ backgroundColor: "#E7E7E7" }}>
                                <div className="BG_Container1" style={{ backgroundColor: BadgeBackground }}>
                                    <img src={`/Badges/${BadgeFlag}.png`} className={Vertical ? "BG_Image2" : "BG_Image1"} alt='Badge'></img>
                                    <div id={ShortHand ? "BG_Text" : "BG_Text1"}>{BadgeCity}</div>
                                </div>
                                <div className='BG_Container2'>
                                    {PlateText && <div className="BG_Number1" style={{ fontFamily: Font, border: `3px solid ${Border}` }}>{PlateText}</div>}
                                    {Layout === "Legal Plates" && <p className="BG_Footer" style={{ backgroundColor: "#E7E7E7" }}>CPD JE2 4UE</p>}
                                    {Layout === "Custom Plates" && <p className="BG_Footer" style={{ backgroundColor: "#E7E7E7", color: FooterColor }}>{FooterText}</p>}
                                </div>
                            </div>
                        </div>
                    }
                    {(PlateChoice === "Front and Rear" || PlateChoice === "Front Only") && !Badge && selectedState === 'standard' && FrontSize === "Option7" &&
                        <div className="Centeralize">
                            <div className="Option10_NoBadge" style={{ backgroundColor: "#E7E7E7" }}>
                                <div className='BG_Container2'>
                                    {PlateText && <div className="Option10_Number" style={{ fontFamily: Font, border: `3px solid ${Border}` }}>{PlateText}</div>}
                                    {!PlateText && <div className="Option10_Number" style={{ fontFamily: Font, border: `3px solid ${Border}` }}>YOUR REG</div>}
                                    {Layout === "Legal Plates" && <p className="Option5_Footer" style={{ backgroundColor: "#E7E7E7" }}>CPD JE2 4UE</p>}
                                    {Layout === "Custom Plates" && <p className="Option5_Footer" style={{ backgroundColor: "#E7E7E7", color: FooterColor }}>{FooterText}</p>}
                                </div>
                            </div>
                        </div>
                    }
                    {(PlateChoice === "Front and Rear" || PlateChoice === "Front Only") && Badge && selectedState === 'standard' && FrontSize === "Option7" &&
                        <div className="Centeralize">
                            <div className="Option10_Plate1" style={{ backgroundColor: "#E7E7E7" }}>
                                <div className="BG_Container1" style={{ backgroundColor: BadgeBackground }}>
                                    <img src={`/Badges/${BadgeFlag}.png`} className={Vertical ? "Option3_Image2" : "Option3_Image1"} alt='Badge'></img>
                                    <div id={ShortHand ? "Option3_Text" : "Option3_Text1"}>{BadgeCity}</div>
                                </div>
                                <div className='BG_Container2'>
                                    {PlateText && <div className="Option10_Number1" style={{ fontFamily: Font, border: `3px solid ${Border}` }}>{PlateText}</div>}
                                    {!PlateText && <div className="Option10_Number1" style={{ fontFamily: Font, border: `3px solid ${Border}` }}>YOUR REG</div>}
                                    {Layout === "Legal Plates" && <p className="SIZE4_Footer" style={{ backgroundColor: "#E7E7E7" }}>CPD JE2 4UE</p>}
                                    {Layout === "Custom Plates" && <p className="SIZE4_Footer" style={{ backgroundColor: "#E7E7E7", color: FooterColor }}>{FooterText}</p>}
                                </div>
                            </div>
                        </div>
                    }
                    {(PlateChoice === "Front and Rear" || PlateChoice === "Front Only") && !Badge && selectedState === 'standard' && FrontSize === "Option10" &&
                        <div className="Centeralize">
                            <div className="SIZE10" style={{ backgroundColor: "#E7E7E7" }}>
                                <div className='BG_Container2'>
                                    {PlateText && <div className="SIZE10_Number" style={{ fontFamily: Font, border: `3px solid ${Border}` }}>{PlateText}</div>}
                                    {!PlateText && <div className="SIZE10_Number" style={{ fontFamily: Font, border: `3px solid ${Border}` }}>YOUR REG</div>}
                                    {Layout === "Legal Plates" && <p className="SIZE4_Footer" style={{ backgroundColor: "#E7E7E7" }}>CPD JE2 4UE</p>}
                                    {Layout === "Custom Plates" && <p className="SIZE4_Footer" style={{ backgroundColor: "#E7E7E7", color: FooterColor }}>{FooterText}</p>}
                                </div>
                            </div>
                        </div>
                    }
                    {(PlateChoice === "Front and Rear" || PlateChoice === "Front Only") && Badge && selectedState === 'standard' && FrontSize === "Option10" &&
                        <div className="Centeralize">
                            <div className="SIZE10_Badge" style={{ backgroundColor: "#E7E7E7" }}>
                                <div className="BG_Container1" style={{ backgroundColor: BadgeBackground }}>
                                    <img src={`/Badges/${BadgeFlag}.png`} className={Vertical ? "SIZE5_Image2" : "SIZE5_Image1"} alt='Badge'></img>
                                    <div id={ShortHand ? "BG_Text" : "BG_Text1"}>{BadgeCity}</div>
                                </div>
                                <div className='BG_Container2'>
                                    {PlateText && <div className="SIZE10_Text" style={{ fontFamily: Font, border: `3px solid ${Border}` }}>{PlateText}</div>}
                                    {Layout === "Legal Plates" && <p className="SIZE11_Footer" style={{ backgroundColor: "#E7E7E7" }}>CPD JE2 4UE</p>}
                                    {Layout === "Custom Plates" && <p className="SIZE11_Footer" style={{ backgroundColor: "#E7E7E7", color: FooterColor }}>{FooterText}</p>}
                                </div>
                            </div>
                        </div>
                    }
                    {(PlateChoice === "Front and Rear" || PlateChoice === "Rear Only") && Badge && selectedState === 'standard' && RearSize === "Option1" &&
                        <div className="Centeralize">
                            <div className="Option1B" style={{ backgroundColor: "#F1B317" }}>
                                <div className="Option1B_Container" style={{ backgroundColor: BadgeBackground }}>
                                    <img src={`/Badges/${BadgeFlag}.png`} className={Vertical ? "Option1B_Image2" : "Option1B_Image1"} alt='Badge'></img>
                                    <div id={ShortHand ? "Option1B_Text1" : "Option1B_Text2"}>{BadgeCity}</div>
                                </div>
                                <div className='Option1B_Container1'>
                                    {PlateText && <div className="Option1B_Number" style={{ fontFamily: Font, border: `3px solid ${Border}` }}>{PlateText}</div>}
                                    {!PlateText && <div className="Option1B_Number" style={{ fontFamily: Font, border: `3px solid ${Border}` }}>YOUR REG</div>}
                                    {Layout === "Legal Plates" && <p className="Option1B_Footer" style={{ backgroundColor: "#F1B317" }}>CPD JE2 4UE</p>}
                                    {Layout === "Custom Plates" && <p className="Option1B_Footer" style={{ backgroundColor: "#F1B317", color: FooterColor }}>{FooterText}</p>}
                                </div>
                            </div>
                        </div>
                    }
                    {(PlateChoice === "Front and Rear" || PlateChoice === "Rear Only") && !Badge && selectedState === 'standard' && RearSize === "Option2" &&
                        <div className="Centeralize">
                            <div className='Option2_Wrapper' style={{ backgroundColor: "#F1B317" }}>
                                <div className='Option2_Container' style={{ fontFamily: Font, border: `3px solid ${Border}` }}>
                                    <div className='Option2_Top'>
                                        {PlateText && <p>{PlateText.substring(0, 4)}</p>}
                                        {!PlateText && <p>REG</p>}
                                    </div>
                                    <div className='Option2_Bottom'>
                                        {PlateText && <p>{PlateText.substring(4)}</p>}
                                        {!PlateText && <p className='S2'>NO#</p>}
                                    </div>
                                    {Layout === "Legal Plates" && <p className="Option2_Footer" style={{ backgroundColor: "#F1B317" }}>CPD JE2 4UE</p>}
                                    {Layout === "Custom Plates" && <p className="Option2_Footer" style={{ backgroundColor: "#F1B317", color: FooterColor }}>{FooterText}</p>}
                                </div>
                            </div>
                        </div>
                    }
                    {(PlateChoice === "Front and Rear" || PlateChoice === "Rear Only") && Badge && selectedState === 'standard' && RearSize === "Option2" &&
                        <div className="Centeralize">
                            <div className='Option2B_Wrapper' style={{ backgroundColor: "#F1B317" }}>
                                <div className='Option2B_Container' style={{ fontFamily: Font, border: `3px solid ${Border}` }}>
                                    <div className='Option2B_Top'>
                                        {PlateText && <p>{PlateText.substring(0, 4)}</p>}
                                        {!PlateText && <p>REG</p>}
                                    </div>
                                    <div className='Option2B_Bottom'>
                                        <div className='Option2B_Container2' style={{ backgroundColor: BadgeBackground }}>
                                            <img src={`/Badges/${BadgeFlag}.png`} className={Vertical ? "BG_Image2" : "BG_Image1"} alt='Badge'></img>
                                            <div id={ShortHand ? "BG_Text" : "BG_Text1"}>{BadgeCity}</div>
                                        </div>
                                        <div className='Option2B_Plate'>
                                            {PlateText && <p>{PlateText.substring(4)}</p>}
                                            {!PlateText && <p>NO#</p>}
                                        </div>
                                    </div>
                                    {Layout === "Legal Plates" && <p className="Option2B_Footer" style={{ backgroundColor: "#F1B317" }}>CPD JE2 4UE</p>}
                                    {Layout === "Custom Plates" && <p className="Option2B_Footer" style={{ backgroundColor: "#F1B317", color: FooterColor }}>{FooterText}</p>}
                                </div>
                            </div>
                        </div>
                    }
                    {(PlateChoice === "Front and Rear" || PlateChoice === "Rear Only") && !Badge && selectedState === 'standard' && RearSize === "Option3" &&
                        <div className="Centeralize">
                            <div className="Option3" style={{ backgroundColor: "#F1B317" }}>
                                <div className='Option3_Container'>
                                    {PlateText && <div className="Option3_Number" style={{ fontFamily: Font, border: `3px solid ${Border}` }}>{PlateText}</div>}
                                    {!PlateText && <div className="Option3_Number" style={{ fontFamily: Font, border: `3px solid ${Border}` }}>YOUR REG</div>}
                                    {Layout === "Legal Plates" && <p className="Option3_Footer" style={{ backgroundColor: "#F1B317" }}>CPD JE2 4UE</p>}
                                    {Layout === "Custom Plates" && <p className="Option3_Footer" style={{ backgroundColor: "#F1B317", color: FooterColor }}>{FooterText}</p>}
                                </div>
                            </div>
                        </div>
                    }
                    {(PlateChoice === "Front and Rear" || PlateChoice === "Rear Only") && Badge && selectedState === 'standard' && RearSize === "Option3" &&
                        <div className="Centeralize">
                            <div className="SIZE3_Badge" style={{ backgroundColor: "#F1B317" }}>
                                <div className="BG_Container1" style={{ backgroundColor: BadgeBackground }}>
                                    <img src={`/Badges/${BadgeFlag}.png`} className={Vertical ? "SIZE3_Image2" : "SIZE3_Image1"} alt='Badge'></img>
                                    <div id={ShortHand ? "SIZE3_Text1" : "SIZE3_Text2"}>{BadgeCity}</div>
                                </div>
                                <div className='BG_Container2'>
                                    {PlateText && <div className="SIZE3_Number" style={{ fontFamily: Font, border: `3px solid ${Border}` }}>{PlateText}</div>}
                                    {Layout === "Legal Plates" && <p className="SIZE3_Footer" style={{ backgroundColor: "#F1B317" }}>CPD JE2 4UE</p>}
                                    {Layout === "Custom Plates" && <p className="SIZE3_Footer" style={{ backgroundColor: "#F1B317", color: FooterColor }}>{FooterText}</p>}
                                </div>
                            </div>
                        </div>
                    }
                    {(PlateChoice === "Front and Rear" || PlateChoice === "Rear Only") && !Badge && selectedState === 'standard' && RearSize === "Option4" &&
                        <div className="Centeralize">
                            <div className="SIZE4" style={{ backgroundColor: "#F1B317" }}>
                                <div className='BG_Container2'>
                                    {PlateText && <div className="SIZE4_Number" style={{ fontFamily: Font, border: `3px solid ${Border}` }}>{PlateText}</div>}
                                    {!PlateText && <div className="SIZE4_Number" style={{ fontFamily: Font, border: `3px solid ${Border}` }}>YOUR REG</div>}
                                    {Layout === "Legal Plates" && <p className="SIZE4_Footer" style={{ backgroundColor: "#F1B317" }}>CPD JE2 4UE</p>}
                                    {Layout === "Custom Plates" && <p className="SIZE4_Footer" style={{ backgroundColor: "#F1B317", color: FooterColor }}>{FooterText}</p>}
                                </div>
                            </div>
                        </div>
                    }
                    {(PlateChoice === "Front and Rear" || PlateChoice === "Rear Only") && Badge && selectedState === 'standard' && RearSize === "Option4" &&
                        <div className="Centeralize">
                            <div className="SIZE4_Badge" style={{ backgroundColor: "#F1B317" }}>
                                <div className="BG_Container1" style={{ backgroundColor: BadgeBackground }}>
                                    <img src={`/Badges/${BadgeFlag}.png`} className={Vertical ? "SIZE3_Image2" : "SIZE3_Image1"} alt='Badge'></img>
                                    <div id={ShortHand ? "SIZE3_Text1" : "SIZE3_Text2"}>{BadgeCity}</div>
                                </div>
                                <div className='BG_Container2'>
                                    {PlateText && <div className="SIZE4_Number" style={{ fontFamily: Font, border: `3px solid ${Border}` }}>{PlateText}</div>}
                                    {Layout === "Legal Plates" && <p className="SIZE3_Footer" style={{ backgroundColor: "#F1B317" }}>CPD JE2 4UE</p>}
                                    {Layout === "Custom Plates" && <p className="SIZE3_Footer" style={{ backgroundColor: "#F1B317", color: FooterColor }}>{FooterText}</p>}
                                </div>
                            </div>
                        </div>
                    }
                    {(PlateChoice === "Front and Rear" || PlateChoice === "Rear Only") && !Badge && selectedState === 'standard' && RearSize === "Option5" &&
                        <div className="Centeralize">
                            <div className="SIZE5" style={{ backgroundColor: "#F1B317" }}>
                                <div className='BG_Container2'>
                                    {PlateText && <div className="SIZE5_Number" style={{ fontFamily: Font, border: `3px solid ${Border}` }}>{PlateText}</div>}
                                    {!PlateText && <div className="SIZE5_Number" style={{ fontFamily: Font, border: `3px solid ${Border}` }}>YOUR REG</div>}
                                    {Layout === "Legal Plates" && <p className="SIZE4_Footer" style={{ backgroundColor: "#F1B317" }}>CPD JE2 4UE</p>}
                                    {Layout === "Custom Plates" && <p className="SIZE4_Footer" style={{ backgroundColor: "#F1B317", color: FooterColor }}>{FooterText}</p>}
                                </div>
                            </div>
                        </div>
                    }
                    {(PlateChoice === "Front and Rear" || PlateChoice === "Rear Only") && Badge && selectedState === 'standard' && RearSize === "Option5" &&
                        <div className="Centeralize">
                            <div className="SIZE5_Badge" style={{ backgroundColor: "#F1B317" }}>
                                <div className="BG_Container1" style={{ backgroundColor: BadgeBackground }}>
                                    <img src={`/Badges/${BadgeFlag}.png`} className={Vertical ? "SIZE5_Image2" : "SIZE5_Image1"} alt='Badge'></img>
                                    <div id={ShortHand ? "SIZE3_Text1" : "SIZE3_Text2"}>{BadgeCity}</div>
                                </div>
                                <div className='BG_Container2'>
                                    {PlateText && <div className="SIZE5_Number" style={{ fontFamily: Font, border: `3px solid ${Border}` }}>{PlateText}</div>}
                                    {Layout === "Legal Plates" && <p className="SIZE3_Footer" style={{ backgroundColor: "#F1B317" }}>CPD JE2 4UE</p>}
                                    {Layout === "Custom Plates" && <p className="SIZE3_Footer" style={{ backgroundColor: "#F1B317", color: FooterColor }}>{FooterText}</p>}
                                </div>
                            </div>
                        </div>
                    }
                    {(PlateChoice === "Front and Rear" || PlateChoice === "Rear Only") && !Badge && selectedState === 'standard' && (RearSize === "Option6" || RearSize === "Option8") &&
                        <div className="Centeralize">
                            <div className='S3_Wrapper' style={{ backgroundColor: "#F1B317" }}>
                                <div className='S3_Container' style={{ fontFamily: Font, border: `3px solid ${Border}` }}>
                                    <div className='S3_Top'>
                                        {PlateText && <p>{PlateText.substring(0, 4)}</p>}
                                        {!PlateText && <p>REG</p>}
                                    </div>
                                    <div className='S3_Bottom'>
                                        {PlateText && <p>{PlateText.substring(4)}</p>}
                                        {!PlateText && <p className='S3'>NO#</p>}
                                    </div>
                                    {Layout === "Legal Plates" && <p className="SIZE6_Footer" style={{ backgroundColor: "#F1B317" }}>CPD JE2 4UE</p>}
                                    {Layout === "Custom Plates" && <p className="SIZE6_Footer" style={{ backgroundColor: "#F1B317", color: FooterColor }}>{FooterText}</p>}
                                </div>
                            </div>
                        </div>
                    }
                    {(PlateChoice === "Front and Rear" || PlateChoice === "Rear Only") && Badge && selectedState === 'standard' && (RearSize === "Option6" || RearSize === "Option8") &&
                        <div className="Centeralize">
                            <div className='S3_Wrapper_Badge' style={{ backgroundColor: "#F1B317" }}>
                                <div className='S3_Container' style={{ fontFamily: Font, border: `3px solid ${Border}` }}>
                                    <div className='S3_Top_Badge'>
                                        {PlateText && <p>{PlateText.substring(0, 4)}</p>}
                                        {!PlateText && <p>REG</p>}
                                    </div>
                                    <div className='S3_Bottom_Badge'>
                                        <div className='S3_Badge_Container' style={{ backgroundColor: BadgeBackground }}>
                                            <img src={`/Badges/${BadgeFlag}.png`} className={Vertical ? "BG_Image2" : "BG_Image1"} alt='Badge'></img>
                                            <div id={ShortHand ? "BG_Text" : "BG_Text1"}>{BadgeCity}</div>
                                        </div>
                                        <div className='S3_Badge_PlateNumber'>
                                            {PlateText && <p>{PlateText.substring(4)}</p>}
                                            {!PlateText && <p>NO#</p>}
                                        </div>
                                    </div>
                                    {Layout === "Legal Plates" && <p className="SIZE6_Footer" style={{ backgroundColor: "#F1B317" }}>CPD JE2 4UE</p>}
                                    {Layout === "Custom Plates" && <p className="SIZE6_Footer" style={{ backgroundColor: "#F1B317", color: FooterColor }}>{FooterText}</p>}
                                </div>
                            </div>
                            <div />
                        </div>
                    }
                    {(PlateChoice === "Front and Rear" || PlateChoice === "Rear Only") && !Badge && selectedState === 'standard' && RearSize === "Option9" &&
                        <div className="Centeralize">
                            <div className="Option6_NoBadge" style={{ backgroundColor: "#F1B317" }}>
                                <div className='BG_Container2'>
                                    {PlateText && <div className="Option6_Number" style={{ fontFamily: Font, border: `3px solid ${Border}` }}>{PlateText}</div>}
                                    {!PlateText && <div className="Option6_Number" style={{ fontFamily: Font, border: `3px solid ${Border}` }}>YOUR REG</div>}
                                    {Layout === "Legal Plates" && <p className="Option5_Footer" style={{ backgroundColor: "#F1B317" }}>CPD JE2 4UE</p>}
                                    {Layout === "Custom Plates" && <p className="Option5_Footer" style={{ backgroundColor: "#F1B317", color: FooterColor }}>{FooterText}</p>}
                                </div>
                            </div>
                        </div>
                    }
                    {(PlateChoice === "Front and Rear" || PlateChoice === "Rear Only") && Badge && selectedState === 'standard' && RearSize === "Option9" &&
                        <div className="Centeralize">
                            <div className="BG_Plate2" style={{ backgroundColor: "#F1B317" }}>
                                <div className="BG_Container1" style={{ backgroundColor: BadgeBackground }}>
                                    <img src={`/Badges/${BadgeFlag}.png`} className={Vertical ? "BG_Image2" : "BG_Image1"} alt='Badge'></img>
                                    <div id={ShortHand ? "BG_Text" : "BG_Text1"}>{BadgeCity}</div>
                                </div>
                                <div className='BG_Container2'>
                                    {PlateText && <div className="BG_Number1" style={{ fontFamily: Font, border: `3px solid ${Border}` }}>{PlateText}</div>}
                                    {Layout === "Legal Plates" && <p className="BG_Footer" style={{ backgroundColor: "#F1B317" }}>CPD JE2 4UE</p>}
                                    {Layout === "Custom Plates" && <p className="BG_Footer" style={{ backgroundColor: "#F1B317", color: FooterColor }}>{FooterText}</p>}
                                </div>
                            </div>
                        </div>
                    }
                    {(PlateChoice === "Front and Rear" || PlateChoice === "Rear Only") && !Badge && selectedState === 'standard' && RearSize === "Option7" &&
                        <div className="Centeralize">
                            <div className="Option10_NoBadge" style={{ backgroundColor: "#F1B317" }}>
                                <div className='BG_Container2'>
                                    {PlateText && <div className="Option10_Number" style={{ fontFamily: Font, border: `3px solid ${Border}` }}>{PlateText}</div>}
                                    {!PlateText && <div className="Option10_Number" style={{ fontFamily: Font, border: `3px solid ${Border}` }}>YOUR REG</div>}
                                    {Layout === "Legal Plates" && <p className="Option5_Footer" style={{ backgroundColor: "#F1B317" }}>CPD JE2 4UE</p>}
                                    {Layout === "Custom Plates" && <p className="Option5_Footer" style={{ backgroundColor: "#F1B317", color: FooterColor }}>{FooterText}</p>}
                                </div>
                            </div>
                        </div>
                    }
                    {(PlateChoice === "Front and Rear" || PlateChoice === "Rear Only") && Badge && selectedState === 'standard' && RearSize === "Option7" &&
                        <div className="Centeralize">
                            <div className="Option10_Plate1" style={{ backgroundColor: "#F1B317" }}>
                                <div className="BG_Container1" style={{ backgroundColor: BadgeBackground }}>
                                    <img src={`/Badges/${BadgeFlag}.png`} className={Vertical ? "Option3_Image2" : "Option3_Image1"} alt='Badge'></img>
                                    <div id={ShortHand ? "Option3_Text" : "Option3_Text1"}>{BadgeCity}</div>
                                </div>
                                <div className='BG_Container2'>
                                    {PlateText && <div className="Option10_Number1" style={{ fontFamily: Font, border: `3px solid ${Border}` }}>{PlateText}</div>}
                                    {!PlateText && <div className="Option10_Number1" style={{ fontFamily: Font, border: `3px solid ${Border}` }}>YOUR REG</div>}
                                    {Layout === "Legal Plates" && <p className="SIZE4_Footer" style={{ backgroundColor: "#F1B317" }}>CPD JE2 4UE</p>}
                                    {Layout === "Custom Plates" && <p className="SIZE4_Footer" style={{ backgroundColor: "#F1B317", color: FooterColor }}>{FooterText}</p>}
                                </div>
                            </div>
                        </div>
                    }
                    {(PlateChoice === "Front and Rear" || PlateChoice === "Rear Only") && !Badge && selectedState === 'standard' && RearSize === "Option10" &&
                        <div className="Centeralize">
                            <div className="SIZE10" style={{ backgroundColor: "#F1B317" }}>
                                <div className='BG_Container2'>
                                    {PlateText && <div className="SIZE10_Number" style={{ fontFamily: Font, border: `3px solid ${Border}` }}>{PlateText}</div>}
                                    {!PlateText && <div className="SIZE10_Number" style={{ fontFamily: Font, border: `3px solid ${Border}` }}>YOUR REG</div>}
                                    {Layout === "Legal Plates" && <p className="SIZE4_Footer" style={{ backgroundColor: "#F1B317" }}>CPD JE2 4UE</p>}
                                    {Layout === "Custom Plates" && <p className="SIZE4_Footer" style={{ backgroundColor: "#F1B317", color: FooterColor }}>{FooterText}</p>}
                                </div>
                            </div>
                        </div>
                    }
                    {(PlateChoice === "Front and Rear" || PlateChoice === "Rear Only") && Badge && selectedState === 'standard' && RearSize === "Option10" &&
                        <div className="Centeralize">
                            <div className="SIZE10_Badge" style={{ backgroundColor: "#F1B317" }}>
                                <div className="BG_Container1" style={{ backgroundColor: BadgeBackground }}>
                                    <img src={`/Badges/${BadgeFlag}.png`} className={Vertical ? "SIZE5_Image2" : "SIZE5_Image1"} alt='Badge'></img>
                                    <div id={ShortHand ? "BG_Text" : "BG_Text1"}>{BadgeCity}</div>
                                </div>
                                <div className='BG_Container2'>
                                    {PlateText && <div className="SIZE10_Text" style={{ fontFamily: Font, border: `3px solid ${Border}` }}>{PlateText}</div>}
                                    {Layout === "Legal Plates" && <p className="SIZE11_Footer" style={{ backgroundColor: "#F1B317" }}>CPD JE2 4UE</p>}
                                    {Layout === "Custom Plates" && <p className="SIZE11_Footer" style={{ backgroundColor: "#F1B317", color: FooterColor }}>{FooterText}</p>}
                                </div>
                            </div>
                        </div>
                    }
                    {(PlateChoice === "Front and Rear" || PlateChoice === "Rear Only") && !Badge && selectedState === 'standard' && RearSize === "Option1" &&
                        <div className="Centeralize">
                            <div className="Option1_Basic" style={{ backgroundColor: "#F1B317" }}>
                                <div className='Option1_Container'>
                                    {PlateText && <div className="Option1_Number" style={{ fontFamily: Font, border: `3px solid ${Border}` }}>{PlateText}</div>}
                                    {!PlateText && <div className="Option1_Number" style={{ fontFamily: Font, border: `3px solid ${Border}` }}>PREVIEW</div>}
                                    {Layout === "Legal Plates" && <p className="Option1_Footer" style={{ backgroundColor: "#F1B317" }}>CPD JE2 4UE</p>}
                                    {Layout === "Custom Plates" && <p className="Option1_Footer" style={{ backgroundColor: "#F1B317", color: FooterColor }}>{FooterText}</p>}
                                </div>
                            </div>
                        </div>
                    }
                    {(PlateChoice === "Front and Rear" || PlateChoice === "Rear Only") && !Badge && selectedState === 'standard' && RearSize === "Option11" &&
                        <div className="Centeralize">
                            <div className="SIZE11" style={{ backgroundColor: "#F1B317" }}>
                                <div className='BG_Container2'>
                                    {PlateText && <div className="SIZE11_Number" style={{ fontFamily: Font, border: `3px solid ${Border}` }}>{PlateText}</div>}
                                    {!PlateText && <div className="SIZE11_Number" style={{ fontFamily: Font, border: `3px solid ${Border}` }}>YOUR REG</div>}
                                    {Layout === "Legal Plates" && <p className="SIZE11_Footer" style={{ backgroundColor: "#F1B317" }}>CPD JE2 4UE</p>}
                                    {Layout === "Custom Plates" && <p className="SIZE11_Footer" style={{ backgroundColor: "#F1B317", color: FooterColor }}>{FooterText}</p>}
                                </div>
                            </div>
                        </div>
                    }
                    {(PlateChoice === "Front and Rear" || PlateChoice === "Rear Only") && Badge && selectedState === 'standard' && RearSize === "Option11" &&
                        <div className="Centeralize">
                            <div className="SIZE11_Badge" style={{ backgroundColor: "#F1B317" }}>
                                <div className="BG_Container1" style={{ backgroundColor: BadgeBackground }}>
                                    <img src={`/Badges/${BadgeFlag}.png`} className={Vertical ? "SIZE5_Image2" : "SIZE5_Image1"} alt='Badge'></img>
                                    <div id={ShortHand ? "BG_Text" : "BG_Text1"}>{BadgeCity}</div>
                                </div>
                                <div className='BG_Container2'>
                                    {PlateText && <div className="SIZE11_Text" style={{ fontFamily: Font, border: `3px solid ${Border}` }}>{PlateText}</div>}
                                    {Layout === "Legal Plates" && <p className="SIZE11_Footer" style={{ backgroundColor: "#F1B317" }}>CPD JE2 4UE</p>}
                                    {Layout === "Custom Plates" && <p className="SIZE11_Footer" style={{ backgroundColor: "#F1B317", color: FooterColor }}>{FooterText}</p>}
                                </div>
                            </div>
                        </div>
                    }
                    {(PlateChoice === "Front and Rear" || PlateChoice === "Rear Only") && !Badge && selectedState === 'standard' && RearSize === "Option12" &&
                        <div className="Centeralize">
                            <div className="SIZE11" style={{ backgroundColor: "#F1B317" }}>
                                <div className='BG_Container2'>
                                    {PlateText && <div className="SIZE11_Number" style={{ fontFamily: Font, border: `3px solid ${Border}`, padding: "0.7rem" }}>{PlateText}</div>}
                                    {!PlateText && <div className="SIZE11_Number" style={{ fontFamily: Font, border: `3px solid ${Border}` }}>YOUR REG</div>}
                                    {Layout === "Legal Plates" && <p className="SIZE11_Footer" style={{ backgroundColor: "#F1B317" }}>CPD JE2 4UE</p>}
                                    {Layout === "Custom Plates" && <p className="SIZE11_Footer" style={{ backgroundColor: "#F1B317", color: FooterColor }}>{FooterText}</p>}
                                </div>
                            </div>
                        </div>
                    }
                    {(PlateChoice === "Front and Rear" || PlateChoice === "Rear Only") && Badge && selectedState === 'standard' && RearSize === "Option12" &&
                        <div className="Centeralize">
                            <div className="SIZE11_Badge" style={{ backgroundColor: "#F1B317" }}>
                                <div className="BG_Container1" style={{ backgroundColor: BadgeBackground }}>
                                    <img src={`/Badges/${BadgeFlag}.png`} className={Vertical ? "BG_Image2" : "BG_Image1"} alt='Badge'></img>
                                    <div id={ShortHand ? "BG_Text" : "BG_Text1"}>{BadgeCity}</div>
                                </div>
                                <div className='BG_Container2'>
                                    {PlateText && <div className="SIZE11_Text" style={{ fontFamily: Font, border: `3px solid ${Border}`, padding: "0.7rem" }}>{PlateText}</div>}
                                    {Layout === "Legal Plates" && <p className="SIZE11_Footer" style={{ backgroundColor: "#F1B317" }}>CPD JE2 4UE</p>}
                                    {Layout === "Custom Plates" && <p className="SIZE11_Footer" style={{ backgroundColor: "#F1B317", color: FooterColor }}>{FooterText}</p>}
                                </div>
                            </div>
                        </div>
                    }
                    {(PlateChoice === "Front and Rear" || PlateChoice === "Rear Only") && !Badge && selectedState === 'standard' && RearSize === "Option13" &&
                        <div className="Centeralize">
                            <div className="SIZE11" style={{ backgroundColor: "#F1B317" }}>
                                <div className='BG_Container2'>
                                    {PlateText && <div className="SIZE11_Number" style={{ fontFamily: Font, border: `3px solid ${Border}`, padding: "0.9rem" }}>{PlateText}</div>}
                                    {!PlateText && <div className="SIZE11_Number" style={{ fontFamily: Font, border: `3px solid ${Border}` }}>YOUR REG</div>}
                                    {Layout === "Legal Plates" && <p className="SIZE11_Footer" style={{ backgroundColor: "#F1B317" }}>CPD JE2 4UE</p>}
                                    {Layout === "Custom Plates" && <p className="SIZE11_Footer" style={{ backgroundColor: "#F1B317", color: FooterColor }}>{FooterText}</p>}
                                </div>
                            </div>
                        </div>
                    }
                    {(PlateChoice === "Front and Rear" || PlateChoice === "Rear Only") && Badge && selectedState === 'standard' && RearSize === "Option13" &&
                        <div className="Centeralize">
                            <div className="SIZE11_Badge" style={{ backgroundColor: "#F1B317" }}>
                                <div className="BG_Container1" style={{ backgroundColor: BadgeBackground }}>
                                    <img src={`/Badges/${BadgeFlag}.png`} className={Vertical ? "BG_Image2" : "BG_Image1"} alt='Badge'></img>
                                    <div id={ShortHand ? "BG_Text" : "BG_Text1"}>{BadgeCity}</div>
                                </div>
                                <div className='BG_Container2'>
                                    {PlateText && <div className="SIZE11_Text" style={{ fontFamily: Font, border: `3px solid ${Border}`, padding: "0.9rem" }}>{PlateText}</div>}
                                    {Layout === "Legal Plates" && <p className="SIZE11_Footer" style={{ backgroundColor: "#F1B317" }}>CPD JE2 4UE</p>}
                                    {Layout === "Custom Plates" && <p className="SIZE11_Footer" style={{ backgroundColor: "#F1B317", color: FooterColor }}>{FooterText}</p>}
                                </div>
                            </div>
                        </div>
                    }
                    {(PlateChoice === "Front and Rear" || PlateChoice === "Rear Only") && !Badge && selectedState === 'standard' && RearSize === "Option14" &&
                        <div className="Centeralize">
                            <div className="SIZE11" style={{ backgroundColor: "#F1B317" }}>
                                <div className='BG_Container2'>
                                    {PlateText && <div className="SIZE11_Number" style={{ fontFamily: Font, border: `3px solid ${Border}`, padding: "0.9rem" }}>{PlateText}</div>}
                                    {!PlateText && <div className="SIZE11_Number" style={{ fontFamily: Font, border: `3px solid ${Border}` }}>YOUR REG</div>}
                                    {Layout === "Legal Plates" && <p className="SIZE11_Footer" style={{ backgroundColor: "#F1B317" }}>CPD JE2 4UE</p>}
                                    {Layout === "Custom Plates" && <p className="SIZE11_Footer" style={{ backgroundColor: "#F1B317", color: FooterColor }}>{FooterText}</p>}
                                </div>
                            </div>
                        </div>
                    }
                    {(PlateChoice === "Front and Rear" || PlateChoice === "Rear Only") && Badge && selectedState === 'standard' && RearSize === "Option14" &&
                        <div className="Centeralize">
                            <div className="SIZE11_Badge" style={{ backgroundColor: "#F1B317" }}>
                                <div className="BG_Container1" style={{ backgroundColor: BadgeBackground }}>
                                    <img src={`/Badges/${BadgeFlag}.png`} className={Vertical ? "BG_Image2" : "BG_Image1"} alt='Badge'></img>
                                    <div id={ShortHand ? "BG_Text" : "BG_Text1"}>{BadgeCity}</div>
                                </div>
                                <div className='BG_Container2'>
                                    {PlateText && <div className="SIZE11_Text" style={{ fontFamily: Font, border: `3px solid ${Border}`, padding: "0.9rem", paddingRight: "1.2rem" }}>{PlateText}</div>}
                                    {Layout === "Legal Plates" && <p className="SIZE11_Footer" style={{ backgroundColor: "#F1B317" }}>CPD JE2 4UE</p>}
                                    {Layout === "Custom Plates" && <p className="SIZE11_Footer" style={{ backgroundColor: "#F1B317", color: FooterColor }}>{FooterText}</p>}
                                </div>
                            </div>
                        </div>
                    }
                    {(PlateChoice === "Front and Rear" || PlateChoice === "Rear Only") && !Badge && selectedState === 'standard' && RearSize === "Option15" &&
                        <div className="Centeralize">
                            <div className="SIZE12" style={{ backgroundColor: "#F1B317" }}>
                                <div className='BG_Container2'>
                                    {PlateText && <div className="SIZE11_Number" style={{ fontFamily: Font, border: `3px solid ${Border}`, padding: "0.9rem" }}>{PlateText}</div>}
                                    {!PlateText && <div className="SIZE11_Number" style={{ fontFamily: Font, border: `3px solid ${Border}` }}>YOUR REG</div>}
                                    {Layout === "Legal Plates" && <p className="SIZE11_Footer" style={{ backgroundColor: "#F1B317" }}>CPD JE2 4UE</p>}
                                    {Layout === "Custom Plates" && <p className="SIZE11_Footer" style={{ backgroundColor: "#F1B317", color: FooterColor }}>{FooterText}</p>}
                                </div>
                            </div>
                        </div>
                    }
                    {(PlateChoice === "Front and Rear" || PlateChoice === "Rear Only") && Badge && selectedState === 'standard' && RearSize === "Option15" &&
                        <div className="Centeralize">
                            <div className="SIZE12_Badge" style={{ backgroundColor: "#F1B317" }}>
                                <div className="BG_Container1" style={{ backgroundColor: BadgeBackground }}>
                                    <img src={`/Badges/${BadgeFlag}.png`} className={Vertical ? "BG_Image2" : "BG_Image1"} alt='Badge'></img>
                                    <div id={ShortHand ? "BG_Text" : "BG_Text1"}>{BadgeCity}</div>
                                </div>
                                <div className='BG_Container2'>
                                    {PlateText && <div className="SIZE11_Text" style={{ fontFamily: Font, border: `3px solid ${Border}`, padding: "0.9rem", paddingRight: "1.2rem" }}>{PlateText}</div>}
                                    {Layout === "Legal Plates" && <p className="SIZE11_Footer" style={{ backgroundColor: "#F1B317" }}>CPD JE2 4UE</p>}
                                    {Layout === "Custom Plates" && <p className="SIZE11_Footer" style={{ backgroundColor: "#F1B317", color: FooterColor }}>{FooterText}</p>}
                                </div>
                            </div>
                        </div>
                    }
                    {(PlateChoice === "Front and Rear" || PlateChoice === "Rear Only") && !Badge && selectedState === 'standard' && RearSize === "Option16" &&
                        <div className="Centeralize" id='Range-Cont'>
                            <img className="RoverImage" src="/Range.png" alt="Rover" style={{ border: '2px solid #000', mask: 'url(#image-mask)' }} />
                            <div class="Rover" >
                                <div class="Rover-Inner" >
                                    <div style={{ fontFamily: Font }}>{PlateText}</div>
                                    {Layout === "Legal Plates" && <p className="Rover_Footer">CPD JE2 4UE</p>}
                                    {Layout === "Custom Plates" && <p className="Rover_Footer" style={{ color: FooterColor }}>{FooterText}</p>}
                                </div>
                            </div>
                        </div>
                    }
                    {(PlateChoice === "Front and Rear" || PlateChoice === "Rear Only") && Badge && selectedState === 'standard' && RearSize === "Option16" &&
                        <div className="Centeralize" id='Range-Cont'>
                            <img className="RoverImage" src="/Range.png" alt="Rover" style={{ border: '2px solid #000', mask: 'url(#image-mask)' }} />
                            <div className="Rover-1" style={{ fontFamily: Font }}>
                                <div className="Badger">
                                    <div className="BG_Container1" style={{ backgroundColor: BadgeBackground }}>
                                        <img src={`/Badges/${BadgeFlag}.png`} className={Vertical ? "Image2" : "Image1"} alt='Badge'></img>
                                        <div id={ShortHand ? "BG_Text" : "BG_Text1"}>{BadgeCity}</div>
                                    </div>
                                    <div>
                                        {PlateText}
                                    </div>
                                </div>
                                <div class="Rover-Inner2" >
                                    {Layout === "Legal Plates" && <p className="Rover_Footer">CPD JE2 4UE</p>}
                                    {Layout === "Custom Plates" && <p className="Rover_Footer" style={{ color: FooterColor }}>{FooterText}</p>}
                                </div>

                            </div>
                        </div>
                    }
                    {(PlateChoice === "Front and Rear" || PlateChoice === "Rear Only") && !Badge && selectedState === 'standard' && RearSize === "Option17" &&
                        <div className="Centeralize" id='Range-Cont'>
                            <img className="RoverImage" src="/Range2.png" alt="Rover" style={{ border: '2px solid #000', mask: 'url(#image-mask)' }} />
                            <div class="Rover" >
                                <div class="Rover-Inner" >
                                    <div style={{ fontFamily: Font }}>{PlateText}</div>
                                    {Layout === "Legal Plates" && <p className="Rover_Footer">CPD JE2 4UE</p>}
                                    {Layout === "Custom Plates" && <p className="Rover_Footer" style={{ color: FooterColor }}>{FooterText}</p>}
                                </div>
                            </div>
                        </div>
                    }
                    {(PlateChoice === "Front and Rear" || PlateChoice === "Rear Only") && Badge && selectedState === 'standard' && RearSize === "Option17" &&
                        <div className="Centeralize" id='Range-Cont'>
                            <img className="RoverImage" src="/Range2.png" alt="Rover" style={{ border: '2px solid #000', mask: 'url(#image-mask)' }} />
                            <div className="Rover-1" style={{ fontFamily: Font }}>
                                <div className="Badger1">
                                    <div className="BG_Container1" style={{ backgroundColor: BadgeBackground }}>
                                        <img src={`/Badges/${BadgeFlag}.png`} className={Vertical ? "Image2" : "Image1"} alt='Badge'></img>
                                        <div id={ShortHand ? "BG_Text" : "BG_Text1"}>{BadgeCity}</div>
                                    </div>
                                    <div>
                                        {PlateText}
                                    </div>
                                </div>
                                <div class="Rover-Inner2" >
                                    {Layout === "Legal Plates" && <p className="Rover_Footer">CPD JE2 4UE</p>}
                                    {Layout === "Custom Plates" && <p className="Rover_Footer" style={{ color: FooterColor }}>{FooterText}</p>}
                                </div>

                            </div>
                        </div>
                    }
                    {(PlateChoice === "Front and Rear" || PlateChoice === "Rear Only") && !Badge && selectedState === 'standard' && RearSize === "Option18" &&
                        <div className="Centeralize" id='Range-Cont'>
                            <img className="RoverImage" src="/Range3.png" alt="Rover" style={{ border: '2px solid #000', mask: 'url(#image-mask)' }} />
                            <div class="Rover" >
                                <div class="Rover-Inner" >
                                    <div style={{ fontFamily: Font }}>{PlateText}</div>
                                    {Layout === "Legal Plates" && <p className="Rover_Footer">CPD JE2 4UE</p>}
                                    {Layout === "Custom Plates" && <p className="Rover_Footer" style={{ color: FooterColor }}>{FooterText}</p>}
                                </div>
                            </div>
                        </div>
                    }
                    {(PlateChoice === "Front and Rear" || PlateChoice === "Rear Only") && Badge && selectedState === 'standard' && RearSize === "Option18" &&
                        <div className="Centeralize" id='Range-Cont'>
                            <img className="RoverImage" src="/Range3.png" alt="Rover" style={{ border: '2px solid #000', mask: 'url(#image-mask)' }} />
                            <div className="Rover-1" style={{ fontFamily: Font }}>
                                <div className="Badger">
                                    <div className="BG_Container1" style={{ backgroundColor: BadgeBackground }}>
                                        <img src={`/Badges/${BadgeFlag}.png`} className={Vertical ? "Image2" : "Image1"} alt='Badge'></img>
                                        <div id={ShortHand ? "BG_Text" : "BG_Text1"}>{BadgeCity}</div>
                                    </div>
                                    <div>
                                        {PlateText}
                                    </div>
                                </div>
                                <div class="Rover-Inner2" >
                                    {Layout === "Legal Plates" && <p className="Rover_Footer">CPD JE2 4UE</p>}
                                    {Layout === "Custom Plates" && <p className="Rover_Footer" style={{ color: FooterColor }}>{FooterText}</p>}
                                </div>

                            </div>
                        </div>
                    }



                    {selectedState !== 'standard' && FrontSize === "Option1" &&
                        <div className="Centeralize">
                            <div className="Option1_Basic" style={{ backgroundColor: "#E7E7E7" }}>
                                <div className='Option1_Container'>
                                    {PlateText && <div id={Attribute} style={{ fontFamily: Font, border: `3px solid ${Border}` }}>{PlateText}</div>}
                                    {!PlateText && <div className="Option1_Number" style={{ fontFamily: Font, border: `3px solid ${Border}` }}>PREVIEW</div>}
                                    {Layout === "Legal Plates" && <p className="Option1_Footer" style={{ backgroundColor: "#E7E7E7" }}>CPD JE2 4UE</p>}
                                    {Layout === "Custom Plates" && <p className="Option1_Footer" style={{ backgroundColor: "#E7E7E7", color: FooterColor }}>{FooterText}</p>}
                                </div>
                            </div>
                        </div>
                    }
                    {selectedState !== 'standard' && FrontSize === "Option2" &&
                        <div className="Centeralize">
                            <div className='Option2_Wrapper' style={{ backgroundColor: "#E7E7E7" }}>
                                <div className='Option2_Container' style={{ fontFamily: Font, border: `3px solid ${Border}` }}>
                                    <div className='Option2_Top'>
                                        {PlateText && <p>{PlateText.substring(0, 4)}</p>}
                                        {!PlateText && <p>REG</p>}
                                    </div>
                                    <div className='Option2_Bottom'>
                                        {PlateText && <p>{PlateText.substring(4)}</p>}
                                        {!PlateText && <p className='S2'>NO#</p>}
                                    </div>
                                    {Layout === "Legal Plates" && <p className="Option2_Footer" style={{ backgroundColor: "#E7E7E7" }}>CPD JE2 4UE</p>}
                                    {Layout === "Custom Plates" && <p className="Option2_Footer" style={{ backgroundColor: "#E7E7E7", color: FooterColor }}>{FooterText}</p>}
                                </div>
                            </div>
                        </div>
                    }
                    {(PlateChoice === "Front and Rear" || PlateChoice === "Front Only") && selectedState !== 'standard' && FrontSize === "Option3" &&
                        <div className="Centeralize">
                            <div className="Option3" style={{ backgroundColor: "#E7E7E7" }}>
                                <div className='Option3_Container'>
                                    {PlateText && <div id={Attribute} style={{ fontFamily: Font, border: `3px solid ${Border}` }}>{PlateText}</div>}
                                    {!PlateText && <div className="Option3_Number" style={{ fontFamily: Font, border: `3px solid ${Border}` }}>PREVIEW</div>}
                                    {Layout === "Legal Plates" && <p className="Option3_Footer" style={{ backgroundColor: "#E7E7E7" }}>CPD JE2 4UE</p>}
                                    {Layout === "Custom Plates" && <p className="Option3_Footer" style={{ backgroundColor: "#E7E7E7", color: FooterColor }}>{FooterText}</p>}
                                </div>
                            </div>
                        </div>
                    }
                    {(PlateChoice === "Front and Rear" || PlateChoice === "Front Only") && selectedState !== 'standard' && FrontSize === "Option4" &&
                        <div className="Centeralize">
                            <div className="SIZE4" style={{ backgroundColor: "#E7E7E7" }}>
                                <div className='BG_Container2'>
                                    {PlateText && <div id={Attribute} style={{ fontFamily: Font, border: `3px solid ${Border}` }}>{PlateText}</div>}
                                    {!PlateText && <div className="SIZE4_Number" style={{ fontFamily: Font, border: `3px solid ${Border}` }}>YOUR REG</div>}
                                    {Layout === "Legal Plates" && <p className="SIZE4_Footer" style={{ backgroundColor: "#E7E7E7" }}>CPD JE2 4UE</p>}
                                    {Layout === "Custom Plates" && <p className="SIZE4_Footer" style={{ backgroundColor: "#E7E7E7", color: FooterColor }}>{FooterText}</p>}
                                </div>
                            </div>
                        </div>
                    }
                    {(PlateChoice === "Front and Rear" || PlateChoice === "Front Only") && selectedState !== 'standard' && FrontSize === "Option5" &&
                        <div className="Centeralize">
                            <div className="SIZE5" style={{ backgroundColor: "#E7E7E7" }}>
                                <div className='BG_Container2'>
                                    {PlateText && <div id={Attribute} style={{ fontFamily: Font, border: `3px solid ${Border}` }}>{PlateText}</div>}
                                    {!PlateText && <div className="SIZE5_Number" style={{ fontFamily: Font, border: `3px solid ${Border}` }}>YOUR REG</div>}
                                    {Layout === "Legal Plates" && <p className="SIZE4_Footer" style={{ backgroundColor: "#E7E7E7" }}>CPD JE2 4UE</p>}
                                    {Layout === "Custom Plates" && <p className="SIZE4_Footer" style={{ backgroundColor: "#E7E7E7", color: FooterColor }}>{FooterText}</p>}
                                </div>
                            </div>
                        </div>
                    }
                    {(PlateChoice === "Front and Rear" || PlateChoice === "Front Only") && selectedState !== 'standard' && (FrontSize === "Option6" || FrontSize === "Option8") &&
                        <div className="Centeralize">
                            <div className='S3_Wrapper' style={{ backgroundColor: "#E7E7E7" }}>
                                <div className='S3_Container' style={{ fontFamily: Font, border: `3px solid ${Border}` }}>
                                    <div className='S3_Top'>
                                        {PlateText && <p>{PlateText.substring(0, 4)}</p>}
                                        {!PlateText && <p>REG</p>}
                                    </div>
                                    <div className='S3_Bottom'>
                                        {PlateText && <p>{PlateText.substring(4)}</p>}
                                        {!PlateText && <p className='S3'>NO#</p>}
                                    </div>
                                    {Layout === "Legal Plates" && <p className="SIZE6_Footer" style={{ backgroundColor: "#E7E7E7" }}>CPD JE2 4UE</p>}
                                    {Layout === "Custom Plates" && <p className="SIZE6_Footer" style={{ backgroundColor: "#E7E7E7", color: FooterColor }}>{FooterText}</p>}
                                </div>
                            </div>
                        </div>
                    }
                    {(PlateChoice === "Front and Rear" || PlateChoice === "Front Only") && selectedState !== 'standard' && FrontSize === "Option7" &&
                        <div className="Centeralize">
                            <div className="Option10_NoBadge" style={{ backgroundColor: "#E7E7E7" }}>
                                <div className='BG_Container2'>
                                    {PlateText && <div id={Attribute} style={{ fontFamily: Font, border: `3px solid ${Border}` }}>{PlateText}</div>}
                                    {!PlateText && <div className="Option10_Number" style={{ fontFamily: Font, border: `3px solid ${Border}` }}>YOUR REG</div>}
                                    {Layout === "Legal Plates" && <p className="Option5_Footer" style={{ backgroundColor: "#E7E7E7" }}>CPD JE2 4UE</p>}
                                    {Layout === "Custom Plates" && <p className="Option5_Footer" style={{ backgroundColor: "#E7E7E7", color: FooterColor }}>{FooterText}</p>}
                                </div>
                            </div>
                        </div>
                    }
                    {(PlateChoice === "Front and Rear" || PlateChoice === "Front Only") && selectedState !== 'standard' && FrontSize === "Option9" &&
                        <div className="Centeralize">
                            <div className="Option6_NoBadge" style={{ backgroundColor: "#E7E7E7" }}>
                                <div className='BG_Container2'>
                                    {PlateText && <div id={Attribute} style={{ fontFamily: Font, border: `3px solid ${Border}` }}>{PlateText}</div>}
                                    {!PlateText && <div className="Option6_Number" style={{ fontFamily: Font, border: `3px solid ${Border}` }}>YOUR REG</div>}
                                    {Layout === "Legal Plates" && <p className="Option5_Footer" style={{ backgroundColor: "#E7E7E7" }}>CPD JE2 4UE</p>}
                                    {Layout === "Custom Plates" && <p className="Option5_Footer" style={{ backgroundColor: "#E7E7E7", color: FooterColor }}>{FooterText}</p>}
                                </div>
                            </div>
                        </div>
                    }
                    {(PlateChoice === "Front and Rear" || PlateChoice === "Front Only") && selectedState !== 'standard' && FrontSize === "Option10" &&
                        <div className="Centeralize">
                            <div className="SIZE10" style={{ backgroundColor: "#E7E7E7" }}>
                                <div className='BG_Container2'>
                                    {PlateText && <div id={Attribute} style={{ fontFamily: Font, border: `3px solid ${Border}` }}>{PlateText}</div>}
                                    {!PlateText && <div className="SIZE10_Number" style={{ fontFamily: Font, border: `3px solid ${Border}` }}>YOUR REG</div>}
                                    {Layout === "Legal Plates" && <p className="SIZE4_Footer" style={{ backgroundColor: "#E7E7E7" }}>CPD JE2 4UE</p>}
                                    {Layout === "Custom Plates" && <p className="SIZE4_Footer" style={{ backgroundColor: "#E7E7E7", color: FooterColor }}>{FooterText}</p>}
                                </div>
                            </div>
                        </div>
                    }


                    {selectedState !== 'standard' && RearSize === "Option1" &&
                        <div className="Centeralize">
                            <div className="Option1_Basic" style={{ backgroundColor: "#F1B317" }}>
                                <div className='Option1_Container'>
                                    {PlateText && <div id={Attribute2} style={{ fontFamily: Font, border: `3px solid ${Border}` }}>{PlateText}</div>}
                                    {!PlateText && <div className="Option1_Number" style={{ fontFamily: Font, border: `3px solid ${Border}` }}>PREVIEW</div>}
                                    {Layout === "Legal Plates" && <p className="Option1_Footer" style={{ backgroundColor: "#F1B317" }}>CPD JE2 4UE</p>}
                                    {Layout === "Custom Plates" && <p className="Option1_Footer" style={{ backgroundColor: "#F1B317", color: FooterColor }}>{FooterText}</p>}
                                </div>
                            </div>
                        </div>
                    }
                    {selectedState !== 'standard' && RearSize === "Option2" &&
                        <div className="Centeralize">
                            <div className='Option2_Wrapper' style={{ backgroundColor: "#F1B317" }}>
                                <div className='Option2_Container' style={{ fontFamily: Font, border: `3px solid ${Border}` }}>
                                    <div className='Option2_Top'>
                                        {PlateText && <p>{PlateText.substring(0, 4)}</p>}
                                        {!PlateText && <p>REG</p>}
                                    </div>
                                    <div className='Option2_Bottom'>
                                        {PlateText && <p>{PlateText.substring(4)}</p>}
                                        {!PlateText && <p className='S2'>NO#</p>}
                                    </div>
                                    {Layout === "Legal Plates" && <p className="Option2_Footer" style={{ backgroundColor: "#F1B317" }}>CPD JE2 4UE</p>}
                                    {Layout === "Custom Plates" && <p className="Option2_Footer" style={{ backgroundColor: "#F1B317", color: FooterColor }}>{FooterText}</p>}
                                </div>
                            </div>
                        </div>
                    }
                    {selectedState !== 'standard' && RearSize === "Option3" &&
                        <div className="Centeralize">
                            <div className="Option3" style={{ backgroundColor: "#F1B317" }}>
                                <div className='Option3_Container'>
                                    {PlateText && <div id={Attribute2} style={{ fontFamily: Font, border: `3px solid ${Border}` }}>{PlateText}</div>}
                                    {!PlateText && <div className="Option3_Number" style={{ fontFamily: Font, border: `3px solid ${Border}` }}>PREVIEW</div>}
                                    {Layout === "Legal Plates" && <p className="Option3_Footer" style={{ backgroundColor: "#F1B317" }}>CPD JE2 4UE</p>}
                                    {Layout === "Custom Plates" && <p className="Option3_Footer" style={{ backgroundColor: "#F1B317", color: FooterColor }}>{FooterText}</p>}
                                </div>
                            </div>
                        </div>
                    }
                    {selectedState !== 'standard' && RearSize === "Option4" &&
                        <div className="Centeralize">
                            <div className="SIZE4" style={{ backgroundColor: "#F1B317" }}>
                                <div className='BG_Container2'>
                                    {PlateText && <div id={Attribute2} style={{ fontFamily: Font, border: `3px solid ${Border}` }}>{PlateText}</div>}
                                    {!PlateText && <div className="SIZE4_Number" style={{ fontFamily: Font, border: `3px solid ${Border}` }}>YOUR REG</div>}
                                    {Layout === "Legal Plates" && <p className="SIZE4_Footer" style={{ backgroundColor: "#F1B317" }}>CPD JE2 4UE</p>}
                                    {Layout === "Custom Plates" && <p className="SIZE4_Footer" style={{ backgroundColor: "#F1B317", color: FooterColor }}>{FooterText}</p>}
                                </div>
                            </div>
                        </div>
                    }
                    {selectedState !== 'standard' && RearSize === "Option5" &&
                        <div className="Centeralize">
                            <div className="SIZE5" style={{ backgroundColor: "#F1B317" }}>
                                <div className='BG_Container2'>
                                    {PlateText && <div id={Attribute2} style={{ fontFamily: Font, border: `3px solid ${Border}` }}>{PlateText}</div>}
                                    {!PlateText && <div className="SIZE5_Number" style={{ fontFamily: Font, border: `3px solid ${Border}` }}>YOUR REG</div>}
                                    {Layout === "Legal Plates" && <p className="SIZE4_Footer" style={{ backgroundColor: "#F1B317" }}>CPD JE2 4UE</p>}
                                    {Layout === "Custom Plates" && <p className="SIZE4_Footer" style={{ backgroundColor: "#F1B317", color: FooterColor }}>{FooterText}</p>}
                                </div>
                            </div>
                        </div>
                    }
                    {selectedState !== 'standard' && (RearSize === "Option6" || RearSize === "Option8") &&
                        <div className="Centeralize">
                            <div className='S3_Wrapper' style={{ backgroundColor: "#F1B317" }}>
                                <div className='S3_Container' style={{ fontFamily: Font, border: `3px solid ${Border}` }}>
                                    <div className='S3_Top'>
                                        {PlateText && <p>{PlateText.substring(0, 4)}</p>}
                                        {!PlateText && <p>REG</p>}
                                    </div>
                                    <div className='S3_Bottom'>
                                        {PlateText && <p>{PlateText.substring(4)}</p>}
                                        {!PlateText && <p className='S3'>NO#</p>}
                                    </div>
                                    {Layout === "Legal Plates" && <p className="SIZE6_Footer" style={{ backgroundColor: "#F1B317" }}>CPD JE2 4UE</p>}
                                    {Layout === "Custom Plates" && <p className="SIZE6_Footer" style={{ backgroundColor: "#F1B317", color: FooterColor }}>{FooterText}</p>}
                                </div>
                            </div>
                        </div>
                    }
                    {selectedState !== 'standard' && RearSize === "Option7" &&
                        <div className="Centeralize">
                            <div className="Option10_NoBadge" style={{ backgroundColor: "#F1B317" }}>
                                <div className='BG_Container2'>
                                    {PlateText && <div id={Attribute2} style={{ fontFamily: Font, border: `3px solid ${Border}` }}>{PlateText}</div>}
                                    {!PlateText && <div className="Option10_Number" style={{ fontFamily: Font, border: `3px solid ${Border}` }}>YOUR REG</div>}
                                    {Layout === "Legal Plates" && <p className="Option5_Footer" style={{ backgroundColor: "#F1B317" }}>CPD JE2 4UE</p>}
                                    {Layout === "Custom Plates" && <p className="Option5_Footer" style={{ backgroundColor: "#F1B317", color: FooterColor }}>{FooterText}</p>}
                                </div>
                            </div>
                        </div>
                    }
                    {selectedState !== 'standard' && RearSize === "Option9" &&
                        <div className="Centeralize">
                            <div className="Option6_NoBadge" style={{ backgroundColor: "#F1B317" }}>
                                <div className='BG_Container2'>
                                    {PlateText && <div id={Attribute2} style={{ fontFamily: Font, border: `3px solid ${Border}` }}>{PlateText}</div>}
                                    {!PlateText && <div className="Option6_Number" style={{ fontFamily: Font, border: `3px solid ${Border}` }}>YOUR REG</div>}
                                    {Layout === "Legal Plates" && <p className="Option5_Footer" style={{ backgroundColor: "#F1B317" }}>CPD JE2 4UE</p>}
                                    {Layout === "Custom Plates" && <p className="Option5_Footer" style={{ backgroundColor: "#F1B317", color: FooterColor }}>{FooterText}</p>}
                                </div>
                            </div>
                        </div>
                    }
                    {selectedState !== 'standard' && RearSize === "Option10" &&
                        <div className="Centeralize">
                            <div className="SIZE10" style={{ backgroundColor: "#F1B317" }}>
                                <div className='BG_Container2'>
                                    {PlateText && <div id={Attribute2} style={{ fontFamily: Font, border: `3px solid ${Border}` }}>{PlateText}</div>}
                                    {!PlateText && <div className="SIZE10_Number" style={{ fontFamily: Font, border: `3px solid ${Border}` }}>YOUR REG</div>}
                                    {Layout === "Legal Plates" && <p className="SIZE4_Footer" style={{ backgroundColor: "#F1B317" }}>CPD JE2 4UE</p>}
                                    {Layout === "Custom Plates" && <p className="SIZE4_Footer" style={{ backgroundColor: "#F1B317", color: FooterColor }}>{FooterText}</p>}
                                </div>
                            </div>
                        </div>
                    }




                    {selectedState !== 'standard' && RearSize === "Option11" &&
                        <div className="Centeralize">
                            <div className="SIZE11" style={{ backgroundColor: "#F1B317" }}>
                                <div className='BG_Container2'>
                                    {PlateText && <div id={Attribute2} style={{ fontFamily: Font, border: `3px solid ${Border}` }}>{PlateText}</div>}
                                    {!PlateText && <div className="SIZE11_Number" style={{ fontFamily: Font, border: `3px solid ${Border}` }}>YOUR REG</div>}
                                    {Layout === "Legal Plates" && <p className="SIZE11_Footer" style={{ backgroundColor: "#F1B317" }}>CPD JE2 4UE</p>}
                                    {Layout === "Custom Plates" && <p className="SIZE11_Footer" style={{ backgroundColor: "#F1B317", color: FooterColor }}>{FooterText}</p>}
                                </div>
                            </div>
                        </div>
                    }
                    {selectedState !== 'standard' && RearSize === "Option12" &&
                        <div className="Centeralize">
                            <div className="SIZE11" style={{ backgroundColor: "#F1B317" }}>
                                <div className='BG_Container2'>
                                    {PlateText && <div id={Attribute2} style={{ fontFamily: Font, border: `3px solid ${Border}`, padding: "0.7rem" }}>{PlateText}</div>}
                                    {!PlateText && <div className="SIZE11_Number" style={{ fontFamily: Font, border: `3px solid ${Border}` }}>YOUR REG</div>}
                                    {Layout === "Legal Plates" && <p className="SIZE11_Footer" style={{ backgroundColor: "#F1B317" }}>CPD JE2 4UE</p>}
                                    {Layout === "Custom Plates" && <p className="SIZE11_Footer" style={{ backgroundColor: "#F1B317", color: FooterColor }}>{FooterText}</p>}
                                </div>
                            </div>
                        </div>
                    }
                    {selectedState !== 'standard' && RearSize === "Option13" &&
                        <div className="Centeralize">
                            <div className="SIZE11" style={{ backgroundColor: "#F1B317" }}>
                                <div className='BG_Container2'>
                                    {PlateText && <div id={Attribute2} style={{ fontFamily: Font, border: `3px solid ${Border}`, padding: "0.9rem" }}>{PlateText}</div>}
                                    {!PlateText && <div className="SIZE11_Number" style={{ fontFamily: Font, border: `3px solid ${Border}` }}>YOUR REG</div>}
                                    {Layout === "Legal Plates" && <p className="SIZE11_Footer" style={{ backgroundColor: "#F1B317" }}>CPD JE2 4UE</p>}
                                    {Layout === "Custom Plates" && <p className="SIZE11_Footer" style={{ backgroundColor: "#F1B317", color: FooterColor }}>{FooterText}</p>}
                                </div>
                            </div>
                        </div>
                    }
                    {selectedState !== 'standard' && RearSize === "Option14" &&
                        <div className="Centeralize">
                            <div className="SIZE11" style={{ backgroundColor: "#F1B317" }}>
                                <div className='BG_Container2'>
                                    {PlateText && <div id={Attribute2} style={{ fontFamily: Font, border: `3px solid ${Border}`, padding: "0.9rem" }}>{PlateText}</div>}
                                    {!PlateText && <div className="SIZE11_Number" style={{ fontFamily: Font, border: `3px solid ${Border}` }}>YOUR REG</div>}
                                    {Layout === "Legal Plates" && <p className="SIZE11_Footer" style={{ backgroundColor: "#F1B317" }}>CPD JE2 4UE</p>}
                                    {Layout === "Custom Plates" && <p className="SIZE11_Footer" style={{ backgroundColor: "#F1B317", color: FooterColor }}>{FooterText}</p>}
                                </div>
                            </div>
                        </div>
                    }
                    {selectedState !== 'standard' && RearSize === "Option15" &&
                        <div className="Centeralize">
                            <div className="SIZE12" style={{ backgroundColor: "#F1B317" }}>
                                <div className='BG_Container2'>
                                    {PlateText && <div id={Attribute2} style={{ fontFamily: Font, border: `3px solid ${Border}`, padding: "0.9rem" }}>{PlateText}</div>}
                                    {!PlateText && <div className="SIZE11_Number" style={{ fontFamily: Font, border: `3px solid ${Border}` }}>YOUR REG</div>}
                                    {Layout === "Legal Plates" && <p className="SIZE11_Footer" style={{ backgroundColor: "#F1B317" }}>CPD JE2 4UE</p>}
                                    {Layout === "Custom Plates" && <p className="SIZE11_Footer" style={{ backgroundColor: "#F1B317", color: FooterColor }}>{FooterText}</p>}
                                </div>
                            </div>
                        </div>
                    }
                    {selectedState !== 'standard' && RearSize === "Option16" &&
                        <div className="Centeralize" id='Range-Cont'>
                            <img className="RoverImage" src="/Range.png" alt="Rover" style={{ border: '2px solid #000', mask: 'url(#image-mask)' }} />
                            <div class="Rover" >
                                <div class="Rover-Inner" >
                                    <div style={{ fontFamily: Font }} id={Attribute2} >{PlateText}</div>
                                    {Layout === "Legal Plates" && <p className="Rover_Footer">CPD JE2 4UE</p>}
                                    {Layout === "Custom Plates" && <p className="Rover_Footer" style={{ color: FooterColor }}>{FooterText}</p>}
                                </div>
                            </div>
                        </div>
                    }
                    {selectedState !== 'standard' && RearSize === "Option17" &&
                        <div className="Centeralize" id='Range-Cont'>
                            <img className="RoverImage" src="/Range2.png" alt="Rover" style={{ border: '2px solid #000', mask: 'url(#image-mask)' }} />
                            <div class="Rover" >
                                <div class="Rover-Inner" >
                                    <div style={{ fontFamily: Font }} id={Attribute2}>{PlateText}</div>
                                    {Layout === "Legal Plates" && <p className="Rover_Footer">CPD JE2 4UE</p>}
                                    {Layout === "Custom Plates" && <p className="Rover_Footer" style={{ color: FooterColor }}>{FooterText}</p>}
                                </div>
                            </div>
                        </div>
                    }
                    {selectedState !== 'standard' && RearSize === "Option18" &&
                        <div className="Centeralize" id='Range-Cont'>
                            <img className="RoverImage" src="/Range3.png" alt="Rover" style={{ border: '2px solid #000', mask: 'url(#image-mask)' }} />
                            <div class="Rover" >
                                <div class="Rover-Inner" >
                                    <div style={{ fontFamily: Font }} id={Attribute2}>{PlateText}</div>
                                    {Layout === "Legal Plates" && <p className="Rover_Footer">CPD JE2 4UE</p>}
                                    {Layout === "Custom Plates" && <p className="Rover_Footer" style={{ color: FooterColor }}>{FooterText}</p>}
                                </div>
                            </div>
                        </div>
                    }
                    <div className="Centeralize" >
                        <div id='YAB'>
                            <div className="Payment-Box">
                                <DisplayBought />
                                <div className="Price">€{CalculatePrice()}</div>
                            </div>
                            <button className="Cart-Button" onClick={OrderPlacement}>Add to Cart</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="Divider">
                <div className="Divider-Text">Why Choose Us?</div>
                <div className="Divider-Text2">You're in safe hands!</div>
                <div id="Divider-Holder">
                    <div>
                        <img className="DividerImage" src="/Image1.png" alt="Cover2"></img>
                    </div>
                    <div className="Divider-Box">
                        <div className="Divider-Text3">Makers of Custom Number Plates and Show Plates</div>
                        <div className="Divider-Text4">The Cheapest Registration Plates in the UK!</div>
                        <div className="Divider-Text5">Trusted provider of custom car number plates with over
                            a decade of industry experience. We specialize in offering personalized plates at affordable
                            prices to customers in the UK and Ireland. Our selection includes both legally compliant plates
                            for road use and stylish plates for car shows. Whether you're looking for a unique gift or need
                            to replace your existing registration plates, we have you covered. Choose from a variety of custom
                            designs, including 3D Gel and 4D Premium plates. Rest assured that once you've finalized your design
                            and placed your order, we'll swiftly manufacture and dispatch your new number plates on the same day,
                            delivering to any destination in the UK.
                        </div>
                    </div>
                </div>
                <div id="Divider-Holder">
                    <div className="Divider-Box">
                        <div className="Divider-Text3">3D Gel and 4D Premium Number Plates</div>
                        <div className="Divider-Text5">We specialize in creating customized number plates that allow you to showcase
                            your unique style and personality. Our designs are fully compliant with UK regulations and ensure your plates
                            are road legal. Choose from our range of 3D gel and 4D premium designs, available in various color borders including
                            black, red, grey, and pink. To add that extra touch of personalization, explore our wide selection of side badges,
                            which make for the perfect accessory for modern vehicles. Our 3D gel plates are crafted using high-quality resin,
                            providing a standout three-dimensional effect that looks stunning on cars, particularly in high-end showrooms.
                            For a personal and premium look, opt for our laser-cut acrylic 4D number plates. At Legal Show Plates, we offer
                            affordable pricing for our 3D gel and 4D premium number plates. Order your bespoke plates conveniently online today!
                        </div>
                    </div>
                    <div>
                        <img className="DividerImage" src="/Image2.png" alt="Cover2"></img>
                    </div>

                </div>





            </div>

            <Footer />







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


const Fonts = [
    'Montserrat',
    'Arial',
    'Courier New',
    'Cafe',
    'Face',
    'Fargo',
    'Helvetica',
    'IBM',
    'Munistic',
    'Playback',
    'Prompt',
    'Raptors',
    'Times New Roman',
    'Saira',
    'Sanidana',
    'Sleeping',
    'Trajan',
    'Verdana',
    'Bungee',
    'Comic Neue',
    'Nunito'
];

const GetPrices = (Option) => {
    const Price = {
        Option1: 12.99,
        Option2: 16.99,
        Option3: 15.49,
        Option4: 17.49,
        Option5: 18.49,
        Option6: 19.49,
        Option7: 19.49,
        Option8: 18.49,
        Option9: 22.49,
        Option10: 19.49,
        Option11: 18.49,
        Option12: 19.49,
        Option13: 20.49,
        Option14: 21.49,
        Option15: 22.49,
        Option16: 27.49,
        Option17: 27.49,
        Option18: 27.49,
    };
    return Price[Option] || 0;
}

const GetPrices4D = (FrontOption, RearOption) => {
    if (FrontOption === 'Option1' && RearOption === 'Option1')
        return 46.98
    else if (FrontOption === 'Option1' && RearOption === 'Option2')
        return 51.48
    else if (FrontOption === 'Option1' && RearOption === 'Option10')
        return 54.98
    else if (FrontOption === 'Option1' && RearOption === 'Option11')
        return 53.98
    else if (FrontOption === 'Option1' && RearOption === 'Option12')
        return 54.98
    else if (FrontOption === 'Option1' && RearOption === 'Option13')
        return 55.98
    else if (FrontOption === 'Option1' && RearOption === 'Option14')
        return 56.98
    else if (FrontOption === 'Option1' && RearOption === 'Option15')
        return 57.98
    else if (FrontOption === 'Option1' && RearOption === 'Option16')
        return 62.98
    else if (FrontOption === 'Option1' && RearOption === 'Option17')
        return 62.98
    else if (FrontOption === 'Option1' && RearOption === 'Option18')
        return 62.98


    else if (FrontOption === 'Option10' && RearOption === 'Option1')
        return 54.98
    else if (FrontOption === 'Option10' && RearOption === 'Option2')
        return 59.48
    else if (FrontOption === 'Option10' && RearOption === 'Option10')
        return 62.98
    else if (FrontOption === 'Option10' && RearOption === 'Option11')
        return 61.98
    else if (FrontOption === 'Option10' && RearOption === 'Option12')
        return 62.98
    else if (FrontOption === 'Option10' && RearOption === 'Option13')
        return 63.98
    else if (FrontOption === 'Option10' && RearOption === 'Option14')
        return 64.98
    else if (FrontOption === 'Option10' && RearOption === 'Option15')
        return 65.98
    else if (FrontOption === 'Option10' && RearOption === 'Option16')
        return 70.98
    else if (FrontOption === 'Option10' && RearOption === 'Option17')
        return 70.98
    else if (FrontOption === 'Option10' && RearOption === 'Option18')
        return 70.98
    else
        return 0
}
const FontFamily = [
    "'Montserrat', sans-serif",
    "'Arial', sans-serif",
    "'Courier New', Courier, monospace",
    "'Cafe', sans-serif",
    "'Face', cursive",
    "'Fargo', cursive",
    "'Helvetica', sans-serif",
    "'IBM', sans-serif",
    "'Munistic', cursive",
    "'Playback', cursive",
    "'Prompt', sans-serif",
    "'Raptors', cursive",
    "'Times New Roman', Times, serif",
    "'Saira', sans-serif",
    "'Sanidana', cursive",
    "'Sleeping', cursive",
    "'Trajan', serif",
    "'Verdana', sans-serif",
    "'Bungee', cursive",
    "'Comic Neue', cursive",
    "'Nunito', sans-serif"
];


const Badges = [
    "ST_GEORGE-ENG",
    "ST_GEORGE-ENGLAND",
    "ST_GEORGE-GB",
    "ST_GEORGE-GREAT BRITAIN",
    "ST_GEORGE-UK",
    "ST_GEORGE-UNITED KINGDOM",
    "ST_GEORGEP-ENG",
    "ST_GEORGEP-ENGLAND",
    "ST_GEORGEP-GB",
    "ST_GEORGEP-GREAT BRITAIN",
    "ST_GEORGEP-UK",
    "ST_GEORGEP-UNITED KINGDOM",
    "WALES-CYM",
    "WALES-CYMRU",
    "WALES-GB",
    "WALES-GREAT BRITAIN",
    "WALES-UK",
    "WALES-UNITED KINGDOM",
    "WALES-WALES",
    "WALESP-CYM",
    "WALESP-CYMRU",
    "WALESP-GB",
    "WALESP-GREAT BRITAIN",
    "WALESP-UK",
    "WALESP-UNITED KINGDOM",
    "WALESP-WALES",
    "SALTIRE-GREAT BRITAIN",
    "SALTIRE-SCOTLAND",
    "SALTIRE-UNITED KINGDOM",
    "SALTIRE-GB",
    "SALTIRE-SCO",
    "SALTIRE-UK",
    "SALTIREP-GREAT BRITAIN",
    "SALTIREP-SCOTLAND",
    "SALTIREP-UNITED KINGDOM",
    "SALTIREP-GB",
    "SALTIREP-SCO",
    "SALTIREP-UK",
    "UNION-ENG",
    "UNION-ENGLAND",
    "UNION-GB",
    "UNION-GREAT BRITAIN",
    "UNION-UK",
    "UNION-UNITED KINGDOM",
    "UNIONP-ENG",
    "UNIONP-ENGLAND",
    "UNIONP-GB",
    "UNIONP-GREAT BRITAIN",
    "UNIONP-UK",
    "UNIONP-UNITED KINGDOM",
    "UNION-CYM",
    "UNION-CYMRU",
    "UNION-UNION",
    "UNIONP-CYM",
    "UNIONP-CYMRU",
    "UNIONP-WALES",
    "UNION-SCOTLAND",
    "UNION-SCO",
    "UNIONP-SCOTLAND",
    "UNIONP-SCO"
];

