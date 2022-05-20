# Group AA4
## Group Name: Cyber-verse

### Project Idea

We decided to create a combination of a smart dashboard and an interactive map that visualizes ‘Cyber Attacks’. The smart dashboard would control all the distinct factors and allow users to collaborate with it, While the map would display the main information. In this case, the map would display information based on the features that are available.

Our product would allow the users to have the ability to manipulate, interact, and display visualization depending on the different functionalities within our smart dashboard. For example, filter attacks, light and dark mode, etc.

This project’s purpose is to track the number of attacks as well as to show the sources of the attack and to track the intended target. If it is possible, we are eager to find possible trends based on geographical location which we may share on the ‘About Page’ that would be available.

### Project Significance and broader impacts

Cyber attacks are a serious issue and will only continue to become more prominent as technology evolves and the Internet of Things (IOT) becomes more widespread. This project hopes to expand on the current body of information by visualizing the relationship between geography and cyber attacks as well as by highlighting cyber attack trends.

Primary functions and major data sources 

### The primary functions of this project are as follows:

1. The smart dashboard would control filters, like slide bar, drop down menu, and check boxes
2. Type of filters that users could choose from: types of attack, types of enterprise, most targeted countries, and location of cyberattack origins, year
3. Search bar: users could highlight certain countries’ cyber attacks and where these attacks are coming from
 

### These are the major data sources that we would like to consider:

- [CVE Data](http://cve.mitre.org/data/downloads/)
- [Common Weakness Enumeration Data](https://cwe.mitre.org/data/downloads.html)
- [Cases Data](https://www.dropbox.com/s/9ndbl34zweit595/FinalSource_Real%20Cases.csv?dl=0)

### Targeted audience

Based on our discussion, our project’s target audience would be intended to local companies (such as banks, business), national level (such as governments, military, worldwide (such as airports) and maybe students like us.

### Multimedia (e.g., external links, texts, images, YouTube videos, etc.)

We will make an additional page about recent cyber attack news from those links below and describe how the current world gets some impact from the cyber attacks. 

- [Gov.uk](https://www.gov.uk/government/news/russia-behind-cyber-attack-with-europe-wide-impact-an-hour-before-ukraine-invasion) 
- [The Daily Swig](https://portswigger.net/daily-swig/cyber-attacks) 

We may also include images to the about page

### Option two: Smart dashboard

- We will use the Mercator Projection and limit the viewing from the country (12) to the global (22). 
    - WGS 84 | EPSG: 3395
    - Center: (34.04018306718541, -7.222163215633134)
- We will use the dark base map  from Mapbox.
    - Style: …/mapbox/dark-v10
- Thematic layers
    - Choropleth map layer for received attacks
        - [HCRL](https://ocslab.hksecurity.net/Datasets/web-hacking-profiling?msclkid=78082dcac75111ec9b9e2790c96b6f26)
        - [Cases Data](https://www.dropbox.com/s/9ndbl34zweit595/FinalSource_Real%20Cases.csv?dl=0 )
    - Vector layers
    - Attribute will be number of attacks
- Coordinated charts
    - On clicking a country the bar graph shows different hacks that have threatened a country.
    - Bar chart visualizing number of attacks for top countries
- Javascript needed
    - C3.js
    - Turf.js (for aggregation of data if needed)
- Type of chart (e.g., line, bar, pie, etc.)
    - Bar chart which represents the number of attacks each country receives and where they originated from. 
    - Line chart which illustrates the amount of cyber attacks happening each year
- Data attributes to be visualized.
    - Sums of attacks that country receives or sums of attacks that country originated the attack. 
 

- How to arrange all the components on the graphical user interface (GUI)?
    - [Figma: Cyber Attacks GUI Prototype](https://www.figma.com/file/eEakc37CPT0rODaMx9QVYq/CyberAttack-Design-Prototype) 
        - We will have separate HTML files so that on the navbar the user can navigate between the different pages. These pages will include:
            - Main Map Page: Smartdashboard, main functions, interactive map and legend
            - About Page: Our Mission Goal and Our Vision Statement
            - Team Members: Information About each member of the team
            - Sub-pages:
                - Credit: Displays who was in charge of what tasks
                - Acknowledgement: Information regarding Professor Bo and TA (Steven Bao)
                - Data Source: Links and brief information about the data that we used to overall form our project.

Github Repo: https://github.com/notzulkifli/aa4geog458final 