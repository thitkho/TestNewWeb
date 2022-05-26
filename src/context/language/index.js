import { createContext, useEffect, useState, useContext } from 'react';

//vn-jp-en.json
const en = {
    "exploreHeader": "Explore",
    "welcomeDescription": "This is a demo app for multi-language website with React Context API",
    "clickMe": "Click Me",
    "aboutMe": "For more info about the author",
    "buttonClicked": "You clicked to button!",
    "enterText": "Please enter your answer",
    "option1": "Option 1",
    "option2": "Option 2",
    "option3": "Option 3"
}
const jp = {
    "exploreHeader": "Explore",
    "welcomeDescription": "このアプリはreactでデモのマルチ言語です",
    "clickMe": "クリック",
    "aboutMe": "作家について",
    "buttonClicked": "クリックしたボタン",
    "enterText": "ここに解答してください.",
    "option1": "選択 1",
    "option2": "選択 2",
    "option3": "選択 3"
}
const vn = {
    "exploreHeader": "Explore",
    "welcomeDescription": "This is a demo app for multi-language website with React Context API",
    "clickMe": "Click Me",
    "aboutMe": "gioi thieu ve tac gia",
    "buttonClicked": "You clicked to button!",
    "enterText": "xin nhap cau tra loi cua ban",
    "option1": "Tuy chon 1",
    "option2": "Tuy chon 2",
    "option3": "Tuy Chon 3"
  }
//language
export const dictonaryList = { en, vn, jp};
export const languageOptions = {
    en: "English",
    vn: "Tieng Viet",
    jp: "日本語"
}
//langue
export const LangueContext = createContext({
    userLangaege: 'en',
    dictionary: dictonaryList.en
});
export const LanguageProvider = ({children}) => {
    const defaultLanguage = window.localStorage.getItem('rcml-lang');
    const [userLangaege, setUserLangaege] = useState(defaultLanguage||'en');
    const value = {
        userLangaege,
        dictionary: dictonaryList[userLangaege],
        userLangaegeChange: selected => {
            const newLangue = languageOptions[selected]?selected:'en';
            setUserLangaege(newLangue);
            window.localStorage.setItem('rmcl-lang', newLangue);
        }
    }
    return(
        <LangueContext.Provider value={value}>
            {children}
        </LangueContext.Provider>
    )
}
export const TextId = ({tid}) =>{
    const languageContext = useContext(LangueContext);
    return languageContext.dictionary[tid]||tid;
}
//
const selectOptions = [
    'option1',
    'option2',
    'option3'     
]
const Explore = () => {

    const [clickText, setClickText] = useState();
    const [selectOption, setSelectOption] = useState();
    const { dictionary } = useContext(LangueContext);

    const handleClick = () => {
        setClickText(
            <TextId tid={"button Click"}/>
        );
    }
    const handleOptionChange = e => {
        setSelectOption(e.target.value);
    }

    return(
        <div>
            <h1><TextId tid="exploreHeader" /></h1>
            <p><TextId tid="welcomeDescription" /></p>
            <div>
                <input type="text" placeholder={dictionary.enterText} />
                <button onClick={handleClick}>
                <TextId tid="clickMe" />
                </button>
                <p>{clickText}</p>
            </div>
            <div>
                <select
                onChange={handleOptionChange}
                value={selectOption}
                >
                {selectOptions.map(option => (
                    <option key={option} value={option}>
                        {dictionary[option]}
                    </option>
                ))}
                </select>
            </div>
{/* 
            <a href="" target="_blank" rel="noopener noreferrer">
                <TextId tid="aboutMe" />
            </a> */}
        </div>
    )
}
//
const LanguageComponent = () => {
    return(
      <LanguageProvider>
        <div>
            <h1> Language Component</h1>
            <header>
                <LanguageSelector />
            </header>
            <Explore />
            <label>env_{process.env.REACT_APP_TEST}</label>
        </div>
      </LanguageProvider>
    )
}
export default LanguageComponent;