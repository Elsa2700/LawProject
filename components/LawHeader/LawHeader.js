import React from 'react';
import '../../style/LawInfo.css'


class LawHeader extends React.Component {
    render() {
        return (
            <div className="LawHeader-frame">
                <header>中華民國憲法</header>
                <p>中華民國國民大會受全體國民之付託，依據孫中山先生創立中華民國之遺教，為鞏固國權，保障民權，奠定社會安寧，增進人民福利，制定本憲法
                    ，頒行全國，永矢咸遵。</p>
            </div>
        )
    }
}

export default LawHeader;