import React, { useState } from 'react';
import Navigation from '../Navigation/Navigation';
import './Homepage.css'

export default function HomePage() {
  const [selectedState, setSelectedState] = useState('');
  const [PlateChoice, SetPlateChoice] = useState("Front and Rear");
  const [PlateText, SetPlateText] = useState("");
  const [Layout, SetLayout] = useState("");
  const [Font, SetFont] = useState("'Montserrat', sans-serif");
  const [FrontSize, SetFrontSize] = useState("Option1");
  const [RearSize , SetRearSize] = useState("Option1");
  const [Badge , SetBadge ] = useState()
  const [BadgeCity , SetBadgeCity ] = useState("")
  const [BadgeFlag , SetBadgeFlag ] = useState("")
  
  function extractFlagAndCity(badge) {
    const [flag, city] = badge.split('-');
    return { flag, city };
  }
  const HandlePlates = (e) => { SetPlateChoice(e.target.value); };
  const HandlePlateText = (e) => { SetPlateText(e.target.value); };
  const handleRadioChange = (e) => { setSelectedState(e.target.value); };
  const HandleLayout = (e) => { SetLayout(e.target.value); };
  const HandleFont = (e) => { SetFont(e.target.value); };
  const HandleFrontSize = (e) => { SetFrontSize(e.target.value); };
  const HandleRearSize = (e) => { SetRearSize(e.target.value); };
  const HandleBadge = (e) => { 
    SetBadge(e.target.value); 
    const [flag, city] = e.target.value.split('-');
    SetBadgeCity(city);
    SetBadgeFlag(flag);
};

  return (
    <>
      <Navigation />

      <div className="container my-3" id="Cover-Holder">
        <h3>Number Plate Builder - Make your own Number Plates {BadgeCity}{BadgeFlag}</h3>
        <div className="container" id="Cover-Inner">
          <h6>
            ALL PLATES WILL BE MADE WITH ROAD LEGAL SPACING UNLESS A NOTE IS LEFT ON THE PAYMENTS PAGE TO STATE OTHERWISE. PLATES CANNOT BE CHANGED AFTER PAYMENT IS MADE. (ONLY LEGALLY SPACED PLATES WILL CONTAIN THE MAKERS NAME AND POSTCODE)
          </h6>
        </div>
      </div>

      <div className="container" id="Create-Plate-Div">
        <div id="PlateDisplay">
            {PlateChoice === "Front and Rear" && !Badge ? (
                <>
                <div className="container" style={{ ...GetStyles(FrontSize, 'Front'), fontFamily: Font }}>
                    {PlateText}
                </div>
                <div className="container" style={{ ...GetStyles(RearSize, 'Rear'), fontFamily: Font }}>
                    {PlateText}
                </div>
                </>
            ) : PlateChoice === "Front and Rear" && Badge ? (
                <>
                    <div className="container" style={GetOptionStyles(FrontSize, 'Front').PlateFront}>
                        <div style={GetOptionStyles(FrontSize, 'Front').BadgeContainer}>
                            <img src='/Badges/Scotland.png' style={GetOptionStyles(FrontSize, 'Front').BadgeImage} alt='Badge'></img>
                            <div style={GetOptionStyles(FrontSize, 'Front').BadgeImageText}>{BadgeCity}</div>
                        </div>
                        <div style={{ ...GetOptionStyles(FrontSize, 'Front').BadgePlateNumber, fontFamily: Font }}>{PlateText}</div>
                    </div>

                    <div className="container" style={GetOptionStyles(RearSize, 'Rear').PlateFront}>
                        <div style={GetOptionStyles(RearSize, 'Rear').BadgeContainer}>
                            <img src='/Badges/Scotland.png' style={GetOptionStyles(RearSize, 'Rear').BadgeImage} alt='Badge'></img>
                            <div style={GetOptionStyles(RearSize, 'Rear').BadgeImageText}>{BadgeCity}</div>
                        </div>
                        <div style={{ ...GetOptionStyles(RearSize, 'Rear').BadgePlateNumber, fontFamily: Font }}>{PlateText}</div>
                    </div>

                </>
            ) : PlateChoice === "Front Only" ? (
                <div className="container" id="PlateFront">
                {PlateText}
                </div>
            ) : PlateChoice === "Rear Only" ? (
                <div className="container" id="PlateRear">
                {PlateText}
                </div>
            ) : null}
            </div>
        <div id="Plate-div-2">
          <>
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
          </>

          <div id="PlateDisplay">
            <input required type="text" placeholder="Registration Number" name="PlateText" id="PlateText" label="PlateText" onChange={HandlePlateText} />
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
                  {Fonts.map((font, index) => (
                    <option key={index} value={FontFamily[index]}>{font}</option>
                  ))}
                </select>
              </div>

              <div className="container my-2" id='Selection-Options'>
                <select id='Dropdown-Large' required onChange={HandleFrontSize}>
                  <option value="">-- Select Front Plate Size--</option>
                  <option value="Option1">Standard Size (20.5x4.4in)</option>
                  <option value="Option2">Standard 4x4 279mm X 203mm (11in X 8in)</option>
                  <option value="Option3">305mm X 152mm (12in X 6in)</option>
                  <option value="Option4">330mm x 111mm (13in X 4.4in)</option>
                  <option value="Option5">330mm X 165mm (13in X 6.5in)</option>
                  <option value="Option6">16in X 4.5in (16in X 4.5in)</option>
                </select>
              </div>

              <div className="container my-2" id='Selection-Options'>
                <select id='Dropdown-Large' required onChange={HandleRearSize}>
                  <option value="">-- Select Rear Plate Size--</option>
                  <option value="Option1">Standard Size (20.5x4.4in)</option>
                  <option value="Option2">Standard 4x4 279mm X 203mm (11in X 8in)</option>
                  <option value="Option3">305mm X 152mm (12in X 6in)</option>
                  <option value="Option4">330mm x 111mm (13in X 4.4in)</option>
                  <option value="Option5">330mm X 165mm (13in X 6.5in)</option>
                  <option value="Option6">16in X 4.5in (16in X 4.5in)</option>
                  <option value="Option7">520mm X 127mm (20.5in X 5in)</option>
                  <option value="Option8">520mm x 140mm (20.5in x 5.5in)</option>
                  <option value="Option9">Rover 75 (635x175mm)</option>                  
                </select>
              </div>

              <div className="container my-2" id='Selection-Options'>
                <select id='Dropdown-Medium' required onChange={HandleBadge}>
                    <option value="">-- Select Badge --</option>
                {Badges.map((badge, index) => (
                    <option key={index} value={badge}>{badge}</option>
                  ))}
                </select>

                <select id='Dropdown' required onChange={HandleFont}>
                  <option value="">-- Select Plate Font--</option>
                  {Fonts.map((font, index) => (
                    <option key={index} value={FontFamily[index]}>{font}</option>
                  ))}
                </select>
              </div>



            </>
          ) :
            (
              <>
              </>
            )}
        </div>
      </div>
    </>
  );
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

const GetStyles = (Option , StyleType) =>
{
    let baseStyle = {}
    if (StyleType==='Front')
    {
        baseStyle = {
            display: 'flex',
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#E7E7E7",
            color: "black",
            fontWeight: "bold",
            marginBottom: "1rem",
          };
    }
    else if (StyleType==='Rear')
    {
        baseStyle = {
            display: 'flex',
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#F1B317",
            color: "black",
            fontWeight: "bold",
            borderRadius: "7px",
            marginBottom: "1rem",
        };
    }
    const PlateStyles = {
        Option1: {
          ...baseStyle,
          paddingLeft: "0.5rem",
          paddingRight: "0.5rem",
          fontSize: "5rem",
          borderRadius: "7px",
        },
        Option2: {
          ...baseStyle,
          width: "45%",
          height: "14rem",
          textOverflow: "none",
          lineHeight: "1.2",
          fontSize: "5rem",
          textAlign: "center",
          borderRadius: "7px",
        },
        Option3: {
          ...baseStyle,
          width: "55%",
          lineHeight: "1",
          height: "10rem",
          textOverflow: "none",
          fontSize: "5rem",
          textAlign: "center",
        },
        Option4: {
          ...baseStyle,
          width: "60%",
          height: "8rem",
          paddingLeft: "0.5rem",
          paddingRight: "0.5rem",
          fontSize: "1rem",
          borderRadius: "7px",
        },
        Option5: {
          ...baseStyle,
          width: "60%",
          height: "10rem",
          fontSize: "5.4rem",
          padding: "6rem",
          borderRadius: "7px",
          textAlign: "center",
          lineHeight: "1",
        },
        Option6: {
          ...baseStyle,
          width: "80%",
          height: "8rem",
          fontSize: "5rem",
          borderRadius: "7px",
        },
        Option7:
        {
            ...baseStyle,
            padding: "0.3rem",
            fontSize: "6rem",
        },
        Option8:
        {
            ...baseStyle,
            padding: "0.6rem",
            fontSize: "6rem",
        },
        Option9:
        {
            ...baseStyle,
            padding: "0.5rem",
            paddingTop: "0.1rem",
            borderRadius: "1rem",
            borderBottomRightRadius: "100%",
            borderBottomLeftRadius: "100%",
            fontSize: "5rem",
        
        }
      };
      
    return PlateStyles[Option]
} 

const GetOptionStyles = (Option, StyleType) => {
    let baseStyle = {};
  
    if (StyleType === 'Front') {
      baseStyle = {
        display: 'grid',
        gridTemplateColumns: '10% 90%',
        fontFamily: 'Montserrat, sans-serif',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '7px',
        backgroundColor: '#E7E7E7',
        color: 'black',
        fontWeight: 'bold',
        marginBottom: '1rem',
      };
    }    
    if (StyleType === 'Rear') {
        baseStyle = {
          display: 'grid',
          gridTemplateColumns: '10% 90%',
          fontFamily: 'Montserrat, sans-serif',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '7px',
          backgroundColor:"#EC8E22",
          color: 'black',
          fontWeight: 'bold',
          marginBottom: '1rem',
        };
      }    
      
  
    const OptionStyles = {
      Option1: {
        BadgeImage: {
          width: '70%',
          height: '50%',
          objectFit: 'cover',
          marginBottom: '4rem',
        },
        BadgeImageText: {
          textAlign: 'center',
          fontSize: '0.5rem',
          justifyContent: 'center',
          textOverflow: 'none',
        },
        BadgePlateNumber: {
          margin: '0.5rem',
          marginLeft: '0.5rem',
          border: '3px solid red',
          borderRadius: '7px',
        },
        BadgeContainer: {
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderRadius: '0.2rem',
          backgroundColor: '#EC8E22',
          color: 'white',
          paddingTop: '0.5rem',
          paddingBottom: '0.5rem',
        },
        PlateFront: {
          ...baseStyle,
          fontSize: '5rem',
          textAlign: 'center',
        },
      },
      Option2: {
        BadgeImage: {
          width: '70%',
          height: '50%',
          objectFit: 'cover',
          marginBottom: '4rem',
        },
        BadgeImageText: {
          textAlign: 'center',
          fontSize: '0.3rem',
          justifyContent: 'center',
          textOverflow: 'none',
        },
        BadgePlateNumber: {
          margin: '0.5rem',
          marginLeft: '0.5rem',
          border: '3px solid red',
          borderRadius: '7px',
        },
        BadgeContainer: {
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderRadius: '0.2rem',
          backgroundColor: '#EC8E22',
          color: 'white',
          paddingTop: '0.5rem',
          paddingBottom: '0.5rem',
        },
        PlateFront: {
          ...baseStyle,
          width: '45%',
          height: '14rem',
          textOverflow: 'none',
          lineHeight: '1.2',
          fontSize: '4rem',
          textAlign: 'center',
        },
      },
      Option3: {
        BadgeImage: {
          width: '70%',
          height: '50%',
          objectFit: 'cover',
          marginBottom: '4rem',
        },
        BadgeImageText: {
          textAlign: 'center',
          fontSize: '0.5rem',
          justifyContent: 'center',
          textOverflow: 'none',
        },
        BadgePlateNumber: {
          margin: '0.5rem',
          marginLeft: '0.5rem',
          border: '3px solid red',
          borderRadius: '7px',
        },
        BadgeContainer: {
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderRadius: '0.2rem',
          backgroundColor: '#EC8E22',
          color: 'white',
          paddingTop: '0.5rem',
          paddingBottom: '0.5rem',
        },
        PlateFront: {
          ...baseStyle,
          width: '55%',
          height: '12rem',
          textOverflow: 'none',
          lineHeight: '1.2',
          fontSize: '4rem',
          textAlign: 'center',
        },
      },
      Option4: {
        BadgeImage: {
          width: '80%',
          height: '50%',
          objectFit: 'cover',
          marginBottom: '4rem',
        },
        BadgeImageText: {
          textAlign: 'center',
          fontSize: '0.3rem',
          justifyContent: 'center',
          textOverflow: 'none',
        },
        BadgePlateNumber: {
          margin: '0.5rem',
          marginLeft: '0.5rem',
        },
        BadgeContainer: {
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderRadius: '0.2rem',
          backgroundColor: '#EC8E22',
          color: 'white',
          paddingTop: '0.5rem',
          paddingBottom: '0.5rem',
        },
        PlateFront: {
          ...baseStyle,
          width: '55%',
          height: '8rem',
          textOverflow: 'none',
          lineHeight: '1.2',
          fontSize: '2rem',
          textAlign: 'center',
        },
      },
      Option5: {
        BadgeImage: {
          width: '70%',
          height: '50%',
          marginBottom: '4rem',
        },
        BadgeImageText: {
          textAlign: 'center',
          fontSize: '0.3rem',
          justifyContent: 'center',
          textOverflow: 'none',
        },
        BadgePlateNumber: {
          margin: '0.5rem',
        },
        BadgeContainer: {
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderRadius: '0.2rem',
          backgroundColor: '#EC8E22',
          color: 'white',
          paddingTop: '0.5rem',
          paddingBottom: '0.5rem',
        },
        PlateFront: {
          ...baseStyle,
          width: '65%',
          height: '15rem',
          textOverflow: 'none',
          lineHeight: '1.2',
          fontSize: '5rem',
          textAlign: 'center',
        },
      },
      Option6: {
        BadgeImage: {
          width: '70%',
          height: '50%',
          marginBottom: '4rem',
        },
        BadgeImageText: {
          textAlign: 'center',
          fontSize: '0.3rem',
          justifyContent: 'center',
          textOverflow: 'none',
        },
        BadgePlateNumber: {
          margin: '0.5rem',
        },
        BadgeContainer: {
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderRadius: '0.2rem',
          backgroundColor: '#EC8E22',
          color: 'white',
          paddingTop: '0.5rem',
          paddingBottom: '0.5rem',
        },
        PlateFront: {
          ...baseStyle,
          width: '70%',
          height: '10rem',
          textOverflow: 'none',
          lineHeight: '1.2',
          fontSize: '4rem',
          textAlign: 'center',
        },
      },
      Option7: {
        BadgeImage: {
          width: '70%',
          height: '50%',
          marginBottom: '4rem',
        },
        BadgeImageText: {
          textAlign: 'center',
          fontSize: '0.8rem',
          justifyContent: 'center',
          textOverflow: 'none',
        },
        BadgePlateNumber: {
          margin: '0.5rem',
        },
        BadgeContainer: {
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderRadius: '0.2rem',
          color: 'white',
          paddingTop: '0.5rem',
          paddingBottom: '0.5rem',
        },
        PlateFront: {
          display: 'grid',
          gridTemplateColumns: '10% 90%',
          fontFamily: 'Montserrat, sans-serif',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '7px',
          backgroundColor: '#EC8E22',
          color: 'black',
          fontWeight: 'bold',
          marginBottom: '1rem',
          padding: '0.3rem',
          fontSize: '4rem',
          height: '10rem',
          textOverflow: 'none',
          lineHeight: '1.2',
          fontSize: '4rem',
          textAlign: 'center',
        },
      },
      Option8 : {
        BadgeImage: {
          width: '70%',
          height: '50%',
          marginBottom: '4rem',
        },
        BadgeImageText: {
          textAlign: 'center',
          fontSize: '0.8rem',
          justifyContent: 'center',
          textOverflow: 'none',
        },
        BadgePlateNumber: {
          margin: '0.5rem',
        },
        BadgeContainer: {
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderRadius: '0.2rem',
          color: 'white',
          paddingTop: '0.5rem',
          paddingBottom: '0.5rem',
        },
        PlateFront: {
          display: 'grid',
          gridTemplateColumns: '10% 90%',
          fontFamily: 'Montserrat, sans-serif',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '7px',
          backgroundColor: '#EC8E22',
          color: 'black',
          fontWeight: 'bold',
          marginBottom: '1rem',
          padding: '0.3rem',
          fontSize: '15rem',
          height: '12rem',
          textOverflow: 'none',
          lineHeight: '1.2',
          fontSize: '4rem',
          textAlign: 'center',
        },
      },
      Option9: {
        BadgeImage: {
          width: '50%',
          height: '50%',
          marginBottom: '1rem',
        },
        BadgeImageText: {
          textAlign: 'center',
          fontSize: '0.7rem',
          justifyContent: 'center',
          textOverflow: 'none',
        },
        BadgePlateNumber: {
          margin: '0.1rem',
          marginTop: '-2rem',
        },
        BadgeContainer: {
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderRadius: '0.2rem',
          color: 'white',
          marginTop: '-2rem',
          marginLeft: '3rem',
          backgroundColor: 'red',
          paddingTop: '0.2rem',
          paddingBottom: '0.2rem',
        },
        PlateFront: {
          display: 'grid',
          gridTemplateColumns: '30% 70%',
          fontFamily: 'Montserrat, sans-serif',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '7px',
          backgroundColor: '#EC8E22',
          color: 'black',
          fontWeight: 'bold',
          marginBottom: '1rem',
          padding: '0.3rem',
          fontSize: '15rem',
          borderBottomRightRadius: '100%',
          borderBottomLeftRadius: '100%',
          height: '12rem',
          textOverflow: 'none',
          lineHeight: '1.2',
          fontSize: '4rem',
          textAlign: 'center',
        },
      }
      
    };

    return OptionStyles[Option]
}  
  
  
    
const GetBadgeStyles = (Option , StyleType) =>
{
    let baseStyle = {}
    if (StyleType==='Front')
    {
        baseStyle = {
            display: 'flex',
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#E7E7E7",
            color: "black",
            fontWeight: "bold",
            marginBottom: "1rem",
          };
    }
    else if (StyleType==='Rear')
    {
        baseStyle = {
            display: 'flex',
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#F1B317",
            color: "black",
            fontWeight: "bold",
            borderRadius: "7px",
            marginBottom: "1rem",
        };
    }
    const PlateStyles = {
        Option1: {
          ...baseStyle,
          paddingLeft: "0.5rem",
          paddingRight: "0.5rem",
          fontSize: "5rem",
          borderRadius: "7px",
        },
        Option2: {
          ...baseStyle,
          width: "45%",
          height: "14rem",
          textOverflow: "none",
          lineHeight: "1.2",
          fontSize: "5rem",
          textAlign: "center",
          borderRadius: "7px",
        },
        Option3: {
          ...baseStyle,
          width: "55%",
          lineHeight: "1",
          height: "10rem",
          textOverflow: "none",
          fontSize: "5rem",
          textAlign: "center",
        },
        Option4: {
          ...baseStyle,
          width: "60%",
          height: "8rem",
          paddingLeft: "0.5rem",
          paddingRight: "0.5rem",
          fontSize: "1rem",
          borderRadius: "7px",
        },
        Option5: {
          ...baseStyle,
          width: "60%",
          height: "10rem",
          fontSize: "5.4rem",
          padding: "6rem",
          borderRadius: "7px",
          textAlign: "center",
          lineHeight: "1",
        },
        Option6: {
          ...baseStyle,
          width: "80%",
          height: "8rem",
          fontSize: "5rem",
          borderRadius: "7px",
        },
        Option7:
        {
            ...baseStyle,
            padding: "0.3rem",
            fontSize: "6rem",
        },
        Option8:
        {
            ...baseStyle,
            padding: "0.6rem",
            fontSize: "6rem",
        },
        Option9:
        {
            ...baseStyle,
            padding: "0.5rem",
            paddingTop: "0.1rem",
            borderRadius: "1rem",
            borderBottomRightRadius: "100%",
            borderBottomLeftRadius: "100%",
            fontSize: "5rem",
        
        }
      };
      
    return PlateStyles[Option]
} 

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
  
  