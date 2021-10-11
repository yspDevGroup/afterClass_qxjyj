import type { ListData, ListItem, ListType } from './data';
import { List } from 'antd';
import { Link, history } from 'umi';
import moment from 'moment';
import styles from './index.less';
import IconFont from '@/components/CustomIcon';

const NewsList = (props: { data: ListItem[]; type: ListType; operation: any }) => {
  const { data, type, operation } = props;
  const teacher = history.location.pathname.indexOf('teacher') > -1;

  return (
    <div className={styles[type]}>
      <List
        dataSource={data}
        renderItem={(v) => {
          return (
            <div className={operation ? 'ui-listItemWrapper' : ''}>
              <div className={operation ? 'ui-listItemContent' : ''}>
                <Link to={v.link!}>
                  <List.Item.Meta
                    title={
                      <div className={styles.TitleRow}>
                        <div className={styles.Title}>
                          {v.SFTT === 1 ? <div className={styles.Headlines}>头条</div> : <></>}
                          {
                            type === 'actList' ? <span>{v.BT}</span> : <span>{v.KHJYJG.QYMC}</span>
                          }

                        </div>
                        <div className={styles.TitleRight}>
                         {
                            type === 'actList' ? '' : <span>{moment(v.createdAt).format('YYYY.MM.DD')}</span>
                         }
                        </div>
                      </div>
                    }
                    description={
                      <>
                        <div className={styles.descRow} key={`${v.title}`}>
                          <div className={styles.descleft}>
                            {
                               type === 'actList' ? <span>{moment(v.createdAt).format('YYYY.MM.DD h:mm:ss')}</span> : <span>类型：机构准入申请</span>
                            }
                          </div>
                          <div className={styles.descright}>
                            {
                              type === 'actList' ? <IconFont type="icon-gengduo" className={styles.gengduo} /> : ''
                            }
                          </div>
                        </div>
                      </>
                    }
                  />
                </Link>
                {/* {operation ? (
                  <IconFont
                    type="icon-arrow"
                    onClick={(e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
                      const tar = findSpan(e.target);
                      const next = tar.closest('.ui-listItemContent').nextElementSibling;
                      if (tar?.className === 'anticon') {
                        tar.className = 'anticon ui-revert';
                        next.style.display = 'block';
                      } else {
                        tar!.className = 'anticon';
                        next.style.display = 'none';
                      }
                    }}
                  />
                ) : (
                  ''
                )} */}
              </div>
            </div>
          );
        }}
      />
    </div>
  );
};

const ListComp = (props: { listData?: ListData; cls?: string; operation?: any }) => {
  if (props.listData) {
    const { header, list, type, noDataImg, noDataText, noDataIcon } = props.listData;
    const { cls, operation } = props;

    return (
      <div className={`${styles.ListComponentBigBox} ${cls}`}>
        {header && header.title ? (
          <div className={styles.ListHeader}>
            <div className={styles.ListHeaderTitle}>{header?.title}</div>
            <div className={styles.ListHeaderMore}>
              <a href={header?.link}>{header?.moreText}</a>
            </div>
          </div>
        ) : (
          ''
        )}
        {list && list.length ? (
          <NewsList data={list} type={type} operation={operation} />
        ) : (
          <>
            {noDataIcon ? (
              <div className={styles.noData}>
                <></>
              </div>
            ) : (
              <></>
            )}
          </>
        )}
      </div>
    );
  }
  return <></>;
}

export default ListComp;
