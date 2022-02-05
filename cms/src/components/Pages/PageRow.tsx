import { pageData } from './PageList';

interface PageRowProps {
    page: pageData
}

const PageRow: React.FC<PageRowProps> = ({ page }) => {

    return (
        <div className="blockCon componentRow componentRow__standard">

            <div className="componentRow__standard__body">
                <div className="componentRow__standard__body__col">
                    <p className="title">{ page.name } - <span>{ page.slug }</span></p>
                    <ul>
                        { page.date_created}
                        <li>created: <span>{ new Date(page.date_created).toLocaleDateString() }</span></li>
                    </ul>
                </div>
   
            </div>
        </div>
    )
}

export default PageRow;