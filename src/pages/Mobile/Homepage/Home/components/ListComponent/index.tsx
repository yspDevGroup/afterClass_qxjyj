import type { ListData, ListItem, ListType } from './data';
import { List } from 'antd';
import { Link, history } from 'umi';
import styles from './index.less';

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
                    style={
                      type === 'descList'
                        ? {
                            background:
                              v.titleRight?.text === '待上课'
                                ? 'rgba(69, 201, 119, 0.05)'
                                : 'rgba(102, 102, 102, 0.05)',
                          }
                        : {}
                    }

                    title={
                      <div className={styles.TitleRow}>
                        <div className={styles.Title}>{v.title}</div>
                        <div className={styles.TitleRight}>
                          {v.titleRight?.text === '待上课' ? (
                            <span style={{ color: '#45C977' }}>{v.titleRight?.text}</span>
                          ) : (
                            <span style={{ color: '#999999' }}>{v.titleRight?.text}</span>
                          )}
                        </div>
                      </div>
                    }
                    description={
                      <>
                        {v.desc?.map((item, index) => {
                          return (
                            <div className={styles.descRow} key={`${v.title}${index.toString()}`}>
                              <div className={styles.descleft}>
                                {item.left.map((t, i) => {
                                  return (
                                    <span key={t} className={styles.descleftspan}>
                                      {i === 0 ? (
                                        ''
                                      ) : (
                                        <span className={styles.descleftInspan}>|</span>
                                      )}
                                      {t}
                                    </span>
                                  );
                                })}
                              </div>
                              <div className={styles.descright}>{item.right}</div>
                            </div>
                          );
                        })}
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
