# Headlines for Visual Studio Code

Shows headlines from [NewsApi.org](https://newsapi.org) in Visual Studio Code status bar.

<img width="620" src="https://raw.githubusercontent.com/masautt/vscode-headlines/master/resources/Headlines.PNG" />

## Installation

Install from [Visual Studio Code Marketplace](https://marketplace.visualstudio.com/items?itemName=masautt.vscode-headlines)

## Build from Source Code

```bash
git clone https://github.com/masautt/vscode-headlines.git
cd vscode-headlines
npm i
npm i vsce -g
vsce package .
```

## Prerequisites

You need to have an active key from NewsAPI in order for this extension to work. You can grab your free key [here](https://newsapi.org/register).


## Set Sources and API Key

After installing, you should see the following on your status bar :

<img width="400" src="https://i.imgur.com/YxW7KDO.png" />

Click the notice and enter your sources in the dropdown menu.

<img width="400" src="https://i.imgur.com/rYG4dlJ.png" />

Add as many tech sources as you want! I usually include the following for my tech news : 

`techcrunch,engadget,hacker-news,recode,techradar,the-next-web,the-verge`

For a list of all NewsAPI sources, click [here](https://newsapi.org/docs/endpoints/sources).

## Settings

If you ever need to change these settings enter `Ctrl Shift p` and type `Headlines` :

<img width="400" src="https://i.imgur.com/Ex9HxGq.png" />



## Future Plans

⚙️ VSCode Integration 
* Toggleable Alignment : Choose where Headlines are placed on your status bar
* Keyboard Shortcuts : Assign custom shortcuts for navigating your headlines
* Custom Refresh Time : Choose when new headlines are requested and displayed
* Clickable Links : Click on a headline to view the link in your browser

📰 NewsAPI Integration
* [Top Headlines](https://newsapi.org/docs/endpoints/top-headlines) : Just grab the top headlines of the day, source agnostic
* [Search Terms](https://newsapi.org/docs/endpoints/everything) : Limit your headlines to a specific keyword i.e. `bitcoin`
* [Categories](https://newsapi.org/docs/endpoints/sources) : Instead of sources, subscribe to categories i.e. `technology`




## Special Thanks

Project based on [Sneezry's vscode-instant-weather extension](https://github.com/Sneezry/vscode-instant-weather).

Free icon from [Nick Roach's](https://www.elegantthemes.com/blog/freebie-of-the-week/beautiful-flat-icons-for-free) [Circle Icons pack](https://www.iconfinder.com/iconsets/circle-icons-1) on [IconFinder.com](https://www.iconfinder.com/).

## License

MIT License.