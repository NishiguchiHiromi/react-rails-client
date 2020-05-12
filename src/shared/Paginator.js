import React from 'react';

const Paging = ({
  count, per, page, setPage,
}) => {
  const pageCount = Math.ceil(count / per);
  return (
    <div>
      <p>
        全
        {count}
        件（
        {per * (page - 1) + 1}
        〜
        {page !== pageCount ? per * page : count}
        件表示）
      </p>

      <div>
        {page > 1 && <button type="button" onClick={() => setPage(1)}>最初</button>}
        {page > 1 && <button type="button" onClick={() => setPage(page - 1)}>前へ</button>}
        {[...Array(pageCount)].map((_, i) => {
          const num = i + 1;
          return (
            <button type="button" key={num} onClick={() => setPage(num)}>
              {num}
              {num === page ? 'now' : ''}
            </button>
          );
        })}
        {page !== pageCount && (
          <button type="button" onClick={() => setPage(page + 1)}>次へ</button>
        )}
        {page !== pageCount && (
          <button type="button" onClick={() => setPage(pageCount)}>最後</button>
        )}
      </div>
    </div>
  );
};

const Paginator = ({
  count, per, page, setPage, children,
}) => (
  <div>
    <Paging per={per} count={count} page={page} setPage={setPage} />
    {children}
    <Paging per={per} count={count} page={page} setPage={setPage} />
  </div>
);
export default Paginator;
