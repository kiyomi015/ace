'use strict';

const Report = require('./report.js');

describe('headings outline text (#132, #381)', () => {
  const t = (hx) => Report.headingOutlineText(hx);

  test('plain text is kept and whitespace collapsed', () => {
    expect(t({ html: '  Chapter\n  One ' })).toBe('Chapter One');
  });
  test('text is HTML-escaped', () => {
    expect(t({ html: '<b> & co' })).toBe('&lt;b&gt; &amp; co');
  });
  test('long text is truncated', () => {
    const out = t({ html: 'x'.repeat(300) });
    expect(out.length).toBe(151);
    expect(out.endsWith('…')).toBe(true);
  });
  test('image-only heading shows the alt text', () => {
    expect(t({ html: '', images: ['Chapter 1'] })).toBe('<span class="toc-image">(image: "Chapter 1")</span>');
  });
  test('image without alt is flagged', () => {
    expect(t({ html: '', images: [null] })).toContain('no alt text');
  });
  test('empty heading gets a marker', () => {
    expect(t({ html: '   ' })).toBe('<span class="toc-empty">Empty heading</span>');
  });
  test('aria-label wins over text content', () => {
    expect(t({ html: 'p. 12 Intro', ariaLabel: 'Introduction' })).toBe('Introduction');
  });
});
