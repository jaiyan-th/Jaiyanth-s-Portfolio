'use client';

import { useEffect } from 'react';

export default function Home() {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if ((window as any).__pfInit) return;
    (window as any).__pfInit = true;

    const $ = (s: string) => document.querySelector(s) as HTMLElement | null;
    const $$ = (s: string) => Array.from(document.querySelectorAll(s)) as HTMLElement[];
    const R = document.documentElement;

    try {
      const t = localStorage.getItem('th');
      if (t) R.dataset.theme = t;
    } catch (e) {}

    const thBtn = $('#th');
    if (thBtn) {
      thBtn.onclick = function () {
        const d = R.dataset.theme
          ? R.dataset.theme === 'dark'
          : window.matchMedia('(prefers-color-scheme:dark)').matches;
        R.dataset.theme = d ? 'light' : 'dark';
        try {
          localStorage.setItem('th', R.dataset.theme);
        } catch (e) {}
      };
    }

    // roll-hover labels
    $$('.rl').forEach(function (e) {
      const x = e.textContent || '';
      const w = document.createElement('span');
      const s = document.createElement('span');
      w.className = 'rw';
      s.textContent = x;
      s.dataset.t = x;
      w.appendChild(s);
      e.textContent = '';
      e.appendChild(w);
    });

    // per-character split
    function split(el: HTMLElement) {
      let n = 0;
      (function walk(p: Node) {
        Array.from(p.childNodes).forEach(function (c) {
          if (c.nodeType === 3) {
            const f = document.createDocumentFragment();
            (c.textContent || '').split(/(\s+)/).forEach(function (w) {
              if (!w) return;
              if (/^\s+$/.test(w)) {
                f.appendChild(document.createTextNode(' '));
                return;
              }
              const s = document.createElement('span');
              s.className = 'wd';
              Array.from(w).forEach(function (ch) {
                const i = document.createElement('i');
                i.textContent = ch;
                i.style.transitionDelay = n++ * 16 + 'ms';
                s.appendChild(i);
              });
              f.appendChild(s);
            });
            c.replaceWith(f);
          } else {
            walk(c);
          }
        });
      })(el);
    }
    $$('.sp').forEach(split);

    const io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (x) {
          if (x.isIntersecting) {
            x.target.classList.add('in');
            io.unobserve(x.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    $$('.sp:not(h1),.up').forEach(function (n) {
      io.observe(n);
    });

    // preloader -> curtain -> hero
    const pre = $('#pre');
    if (pre) {
      setTimeout(function () {
        pre.classList.add('a');
      }, 80);
      setTimeout(function () {
        pre.classList.add('go');
        setTimeout(function () {
          const h1 = $('h1');
          if (h1) h1.classList.add('in');
          $$('#top .up').forEach(function (n, i) {
            setTimeout(function () {
              n.classList.add('in');
            }, 250 + i * 140);
          });
        }, 450);
      }, 1900);
    }

    // page-wipe transition on section jumps
    const wp = $('#wp');
    $$('[data-w]').forEach(function (a) {
      a.onclick = function (e) {
        const h = a.getAttribute('href');
        if (!h || h.charAt(0) !== '#' || h === '#') return;
        e.preventDefault();
        if (wp) {
          wp.className = 'u';
          setTimeout(function () {
            R.style.scrollBehavior = 'auto';
            const target = h === '#top' ? document.body : $(h);
            if (target) target.scrollIntoView();
            R.style.scrollBehavior = '';
            wp.className = 'o';
            setTimeout(function () {
              wp.className = '';
            }, 700);
          }, 700);
        }
      };
    });

    // cursor star
    const cur = $('#cur');
    let cx = 0,
      cy = 0,
      tx = 0,
      ty = 0,
      rot = 0;
    window.addEventListener('mousemove', function (e) {
      tx = e.clientX;
      ty = e.clientY;
    });

    $$('a,button,.pr .hd,.pl span').forEach(function (a) {
      a.addEventListener('mouseenter', function () {
        if (cur) cur.classList.add('h');
      });
      a.addEventListener('mouseleave', function () {
        if (cur) cur.classList.remove('h');
      });
    });

    // accordion
    const rows = $$('.pr');
    rows.forEach(function (r) {
      r.addEventListener('mouseenter', function () {
        rows.forEach(function (o) {
          o.classList.toggle('open', o === r);
        });
      });
      const hd = r.querySelector('.hd');
      if (hd) {
        (hd as HTMLElement).onclick = function () {
          rows.forEach(function (o) {
            o.classList.toggle('open', o === r);
          });
        };
      }
    });

    // marquees, velocity-coupled
    const W = [
      'TypeScript',
      'Supabase',
      'REST APIs',
      'Groq & Mistral',
      'AES-256-GCM',
      'Vector Databases',
      'Tailwind CSS',
      'IEEE Co-Authored',
    ];
    function fill(id: string, a: string[]) {
      let h = '';
      for (let i = 0; i < 4; i++) {
        a.forEach(function (w) {
          h += '<span>' + w.replace(/&/g, '&amp;') + '</span>';
        });
      }
      const el = $(id);
      if (el) el.innerHTML = h;
    }
    fill('#m1', W);
    fill('#m2', W.slice().reverse());

    let x1 = 0,
      x2 = -1e5,
      ly = window.scrollY,
      v = 0;

    // scrub paragraph
    const sc = $('#sc');
    if (sc) {
      $$('#sc p.t').forEach(function (p) {
        p.innerHTML = (p.textContent || '')
          .split(' ')
          .map(function (w) {
            return '<b>' + w.replace(/&/g, '&amp;') + '</b>';
          })
          .join(' ');
      });
    }
    const B = $$('#sc b');
    const pi = $('#pi');
    const sky = $('#sky');
    const tl = $('#tl');

    let animId: number;
    function frame() {
      cx += (tx - cx) * 0.2;
      cy += (ty - cy) * 0.2;
      rot += ((tx - cx) * 0.6 - rot) * 0.1;
      if (cur) {
        cur.style.transform = 'translate(' + cx + 'px,' + cy + 'px) rotate(' + rot + 'deg)';
      }

      v += (Math.abs(window.scrollY - ly) - v) * 0.1;
      const dir = window.scrollY >= ly ? 1 : -1;
      ly = window.scrollY;
      const s = 1.1 + v * 0.4;
      x1 -= s * dir;
      x2 += s * dir;

      const m1 = $('#m1');
      const m2 = $('#m2');
      if (m1 && m2) {
        const h1 = m1.scrollWidth / 2;
        const h2 = m2.scrollWidth / 2;
        if (x1 <= -h1) x1 += h1;
        if (x1 > 0) x1 -= h1;
        if (x2 <= -h2 || x2 < -1e4) x2 = -h2 + (x2 % h2);
        if (x2 > 0) x2 -= h2;
        m1.style.transform = 'translateX(' + x1 + 'px)';
        m2.style.transform = 'translateX(' + x2 + 'px)';
      }

      if (sc && B.length > 0) {
        const r = sc.getBoundingClientRect();
        const p = Math.min(
          1.1,
          Math.max(0, (window.innerHeight * 0.8 - r.top - 200) / (r.height - 100))
        );
        B.forEach(function (b, i) {
          const q = i / B.length;
          b.className = q < p - 0.05 ? 'd' : q < p ? 'c' : '';
        });
        if (tl) {
          tl.style.transform = 'rotate(' + (p * 36 - 10) + 'deg)';
        }
      }

      if (pi && pi.parentNode) {
        const pb = (pi.parentNode as HTMLElement).getBoundingClientRect();
        pi.style.transform = 'translateY(' + -pb.top * 0.08 + 'px)';
      }

      if (sky) {
        const sb = sky.getBoundingClientRect();
        sky.style.backgroundPosition = '50% ' + (50 + (sb.top / window.innerHeight) * 30) + '%';
      }

      animId = requestAnimationFrame(frame);
    }
    animId = requestAnimationFrame(frame);

    const f = $('#f');
    if (f) {
      f.onsubmit = function (e) {
        e.preventDefault();
        const inputs = f.querySelectorAll('input,textarea') as NodeListOf<HTMLInputElement | HTMLTextAreaElement>;
        const name = inputs[0]?.value || '';
        const email = inputs[1]?.value || '';
        const subject = inputs[2]?.value || 'Portfolio inquiry';
        const message = inputs[3]?.value || '';
        window.location.href =
          'mailto:jaiyanthofficial@gmail.com?subject=' +
          encodeURIComponent(subject) +
          '&body=' +
          encodeURIComponent(message + '\n\n— ' + name + ' (' + email + ')');
      };
    }

    return () => {
      cancelAnimationFrame(animId);
      io.disconnect();
    };
  }, []);

  return (
    <>
      <div id="pre">
        <b>JAIYANTH B</b>
      </div>
      <div id="wp"></div>
      <svg id="cur" viewBox="0 0 24 24">
        <path
          fill="currentColor"
          d="M12 1c1 4 2 6 5 6-2 2-2 3 0 5-3 0-4 2-5 5-1-3-2-5-5-5 2-2 2-3 0-5 3 0 4-2 5-6z"
        />
      </svg>
      <div id="tab">Available for new roles</div>
      <nav>
        <a href="#top" data-w className="rl">
          Jaiyanth B
        </a>
        <div className="l">
          <a data-w className="rl" href="#about">
            About
          </a>
          <a data-w className="rl" href="#stack">
            Stack
          </a>
          <a data-w className="rl" href="#work">
            Work
          </a>
          <a data-w className="rl" href="#experience">
            Experience
          </a>
          <a data-w className="rl" href="#research">
            Research
          </a>
          <a data-w className="rl" href="#certs">
            Certifications
          </a>
        </div>
        <div>
          <a data-w className="rl" href="#contact">
            Get in touch
          </a>
          <button id="th" aria-label="Toggle theme">
            ◐
          </button>
        </div>
      </nav>

      <header id="top">
        <div className="w hero">
          <div>
            <h1 className="sp">
              Engineering that doesn&apos;t break when it <span className="red">matters.</span>
            </h1>
            <p className="up">
              Applied AI, full-stack systems, and structured APIs — built to actually work when
              someone else has to rely on them.
            </p>
            <div className="cta up">
              <a className="bt rl" data-w href="#contact">
                Get in touch
              </a>
              <a className="ul rl" data-w href="#work">
                See the work →
              </a>
            </div>
            <div className="snap up">
              <div>
                <small>Location</small>Karur, Tamil Nadu, India
              </div>
              <div>
                <small>Focus</small>Applied AI · Full-Stack Engineering
              </div>
              <div>
                <small>Stack</small>Python · SQL · LangChain · LLM Integration
              </div>
              <div>
                <small>Status</small>Open to full-time &amp; internship roles
              </div>
            </div>
          </div>
          <figure className="pt up">
            <img id="pi" src="/images/portrait.jpg" alt="Jaiyanth B" />
          </figure>
        </div>
      </header>

      <div className="mq">
        <div id="m1"></div>
      </div>
      <div className="mq" style={{ borderTop: 0 }}>
        <div id="m2"></div>
      </div>

      <section id="about">
        <div className="w" id="sc">
          <p className="k">
            About <span>/ the story so far</span>
          </p>
          <h2 className="sp">From signal to system to story.</h2>
          <div className="sg">
            <div>
              <p className="t">
                I&apos;m a final-year Computer Science &amp; Business Systems student focused on
                applied AI and full-stack engineering. My work sits between research and production —
                RAG pipelines, conversational systems, structured APIs, and end-to-end products that
                hold up under real use.
              </p>
              <p className="t">
                I&apos;ve co-authored an IEEE research paper on preventive healthcare AI, completed
                an AI internship building production prototypes, and shipped four projects that anchor
                what I&apos;ve learned. I&apos;m currently open to applied-AI and full-stack roles
                where rigour and care for the user matter as much as the model.
              </p>
            </div>
            <div id="tl">
              <img src="/images/portrait.jpg" alt="Jaiyanth B, Engineer" />
            </div>
          </div>
        </div>
      </section>

      <section id="stack">
        <div className="w">
          <p className="k">
            Stack <span>/ what I reach for</span>
          </p>
          <h2 className="sp">The stack I build with.</h2>
          <ul className="ls">
            <li>
              <h3>Programming Languages</h3>
              <div className="pl">
                <span>Python</span>
                <span>SQL</span>
                <span>Java</span>
              </div>
            </li>
            <li>
              <h3>Frontend Technologies</h3>
              <div className="pl">
                <span>HTML</span>
                <span>CSS</span>
                <span>React</span>
                <span>Tailwind CSS</span>
                <span>JavaScript</span>
              </div>
            </li>
            <li>
              <h3>Backend Technologies</h3>
              <div className="pl">
                <span>FastAPI</span>
                <span>Flask</span>
                <span>REST APIs</span>
                <span>JWT Authentication</span>
              </div>
            </li>
            <li>
              <h3>Databases</h3>
              <div className="pl">
                <span>Supabase</span>
                <span>MySQL</span>
                <span>PostgreSQL</span>
                <span>Qdrant (Vector Database)</span>
              </div>
            </li>
            <li>
              <h3>AI &amp; ML</h3>
              <div className="pl">
                <span>Machine Learning</span>
                <span>NLP</span>
                <span>RAG</span>
                <span>LangChain</span>
                <span>Prompt Engineering</span>
              </div>
            </li>
            <li>
              <h3>Tools</h3>
              <div className="pl">
                <span>Git</span>
                <span>GitHub</span>
                <span>Postman</span>
                <span>Figma</span>
                <span>Stitch</span>
                <span>Power BI</span>
              </div>
            </li>
          </ul>
          <p className="ft">IEEE Published · 4 Production-Ready Projects Shipped</p>
        </div>
      </section>

      <section id="work">
        <div className="w">
          <p className="k">
            Work <span>/ proof of work</span>
          </p>
          <h2 className="sp">Things I&apos;ve built and shipped.</h2>
          <ul className="ls" id="pj">
            <li className="pr open">
              <div className="hd">
                <h3>Fake News Detector</h3>
                <a className="ob rl" href="/projects/fake-news-detector">
                  Case Study ↗
                </a>
              </div>
              <div className="bd">
                <div className="i2">
                  <div>
                    <p>
                      A RAG-powered fact-checking pipeline that cross-references incoming articles
                      against a curated evidence base and surfaces a retrieval-grounded trust verdict.
                    </p>
                    <dl>
                      <dt>Project 01</dt>
                      <dd>Applied AI · RAG</dd>
                      <dt>Stack</dt>
                      <dd>Python, Flask, Supabase, Vector Database, RAG</dd>
                    </dl>
                  </div>
                  <img src="/images/project-1.jpg" alt="Fake News Detector" />
                </div>
              </div>
            </li>
            <li className="pr">
              <div className="hd">
                <h3>Up-Skill</h3>
                <a className="ob rl" href="/projects/up-skill">
                  Case Study ↗
                </a>
              </div>
              <div className="bd">
                <div className="i2">
                  <div>
                    <p>
                      An AI career assistant that scores resumes ATS-style, runs mock interviews,
                      maps skill gaps, and proposes personalized learning paths.
                    </p>
                    <dl>
                      <dt>Project 02</dt>
                      <dd>Applied AI · Career</dd>
                      <dt>Stack</dt>
                      <dd>Flask, Supabase, Stitch, NLP, Groq</dd>
                    </dl>
                  </div>
                  <img src="/images/project-2.jpg" alt="Up-Skill" />
                </div>
              </div>
            </li>
            <li className="pr">
              <div className="hd">
                <h3>Car-Rent</h3>
                <a className="ob rl" href="/projects/car-rent">
                  Case Study ↗
                </a>
              </div>
              <div className="bd">
                <div className="i2">
                  <div>
                    <p>
                      A full-stack rental platform covering vehicle discovery, booking, reviews,
                      payments, and secure authentication, with REST APIs and relational data
                      modeling.
                    </p>
                    <dl>
                      <dt>Project 03</dt>
                      <dd>Full-Stack · Platform</dd>
                      <dt>Stack</dt>
                      <dd>Next.js, React, TypeScript, NestJS, Prisma ORM</dd>
                    </dl>
                  </div>
                  <img src="/images/project-3.jpg" alt="Car-Rent" />
                </div>
              </div>
            </li>
            <li className="pr">
              <div className="hd">
                <h3>Secure Document Vault</h3>
                <a className="ob rl" href="/projects/secure-document-vault">
                  Case Study ↗
                </a>
              </div>
              <div className="bd">
                <div className="i2">
                  <div>
                    <p>
                      A zero-trust encrypted document vault with AES-256-GCM authenticated
                      encryption, role-based access control, chunked streaming, and immutable audit
                      logging.
                    </p>
                    <dl>
                      <dt>Project 04</dt>
                      <dd>Full-Stack · Security</dd>
                      <dt>Stack</dt>
                      <dd>Python, FastAPI, SQLAlchemy, PostgreSQL, AES-256-GCM</dd>
                    </dl>
                  </div>
                  <img src="/images/project-4.jpg" alt="Secure Document Vault" />
                </div>
              </div>
            </li>
          </ul>
          <div className="cb up">
            <span>
              Explore all repositories on GitHub or get in touch for custom engineering engagements.
            </span>
            <div>
              <a
                className="bt o rl"
                href="https://github.com/jaiyan-th"
                target="_blank"
                rel="noopener noreferrer"
              >
                View GitHub ↗
              </a>
              <a className="bt rl" data-w href="#contact">
                Contact Me
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id="experience" style={{ paddingTop: 0 }}>
        <div className="w xp">
          <p className="k">
            Experience <span>/ on the job</span>
          </p>
          <h2 className="sp">Where I&apos;ve worked.</h2>
          <div className="xh">
            <h3>AI Intern — Brainery Spot Technology</h3>
            <span>Jun–Jul 2025 · Completed</span>
          </div>
          <p className="up">
            Built applied-AI prototypes that needed to work, not just demo. Shipped RAG and LLM
            workflows, integrated third-party REST APIs cleanly, and practiced the unglamorous
            engineering habits — debugging, testing, prompt iteration, team feedback — that make AI
            systems dependable in production.
          </p>
          <div className="pl2">
            <span>Engineering Pipeline</span>
            <span>8 Stages</span>
          </div>
          <ul className="ls pi">
            <li>
              <b>01</b>Python AI workflows
            </li>
            <li>
              <b>02</b>Prompt engineering
            </li>
            <li>
              <b>03</b>Debugging
            </li>
            <li>
              <b>04</b>Testing
            </li>
            <li>
              <b>05</b>REST API integration
            </li>
            <li>
              <b>06</b>RAG and LLM prototypes
            </li>
            <li>
              <b>07</b>Git collaboration
            </li>
            <li>
              <b>08</b>Team feedback
            </li>
          </ul>
        </div>
      </section>

      <section id="research" style={{ paddingTop: 0 }}>
        <div className="w rs">
          <p className="k">
            Research <span>/ peer-reviewed</span>
          </p>
          <h2 className="sp">Research that made it to print.</h2>
          <div className="xh">
            <span>ICETSIS 2026 · Bahrain · May 2026 · IEEE Bahrain Section</span>
            <a
              className="ul rl"
              href="https://drive.google.com/file/d/1ro5v9Cb1Un-pj2ZEiKdZVDEPDeOpfEU_/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
            >
              View Certificate ↗
            </a>
          </div>
          <p className="k">Published · Co-authored IEEE Paper · Peer-reviewed and Accepted</p>
          <div className="xh">
            <h3>
              An AI Intelligence Wellness Framework Integrating Image Recognition and Conversational
              AI for Preventive Healthcare
            </h3>
          </div>
          <p className="up">
            A preventive-healthcare framework that combines image recognition with a conversational
            AI layer to surface early wellness signals, guide users through structured follow-up
            questions, and route them toward appropriate care — emphasizing explainability,
            low-friction interaction, and clinician-friendly summaries.
          </p>
          <p className="ft" style={{ margin: 0 }}>
            Keywords: Image recognition, Conversational AI, Preventive healthcare, Research
            collaboration, Technical presentation
          </p>
        </div>
      </section>

      <section id="certs" style={{ paddingTop: 0 }}>
        <div className="w">
          <p className="k">
            Credentials <span>/ on record</span>
          </p>
          <h2 className="sp">Certifications, verified.</h2>
          <ul className="ls cg">
            <li>
              <small>Coursera</small>
              <h3>Python Programming &amp; Full-Stack Development</h3>
              <small>2025</small>
            </li>
            <li>
              <small>NPTEL</small>
              <h3>Artificial Intelligence: Concepts and Techniques</h3>
              <small>2025</small>
            </li>
            <li>
              <small>AWS Training &amp; Certification</small>
              <h3>AWS Foundations: Getting Started with AWS Cloud Essentials</h3>
              <small>2026</small>
            </li>
            <li>
              <small>FutureSkills Prime (NASSCOM)</small>
              <h3>Certificate Program in AI &amp; Machine Learning</h3>
              <small>2026</small>
            </li>
          </ul>
          <p className="ft">4 Industry Credentials Verified · Cloud, AI &amp; Full-Stack</p>
        </div>
      </section>

      <section id="contact">
        <div id="sky">
          <div className="w">
            <form className="cd" id="f">
              <h2 className="sp">Let&apos;s talk.</h2>
              <p className="pp">
                Open for full-time engineering roles, internship opportunities, and technical
                collaboration.
              </p>
              <div className="dc">
                <div>
                  <small>Direct Contact · Available 2026</small>
                </div>
                <div>
                  <small>Email</small>
                  <a href="mailto:jaiyanthofficial@gmail.com">jaiyanthofficial@gmail.com</a>
                </div>
                <div>
                  <small>Location</small>Karur, Tamil Nadu, India
                </div>
                <div>
                  <small>Online Profiles</small>
                  <span style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
                    <a
                      className="bt o rl"
                      href="https://www.linkedin.com/in/jaiyan-th/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      LinkedIn ↗
                    </a>
                    <a
                      className="bt o rl"
                      href="https://github.com/jaiyan-th"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      GitHub ↗
                    </a>
                  </span>
                </div>
              </div>
              <div>
                <div className="r2">
                  <label className="fd">
                    Your Name
                    <input required placeholder="Jane Doe" />
                  </label>
                  <label className="fd">
                    Your Email
                    <input type="email" required placeholder="jane@example.com" />
                  </label>
                </div>
                <label className="fd">
                  Subject
                  <input placeholder="Project inquiry / Full-time role" />
                </label>
                <label className="fd">
                  Message
                  <textarea
                    required
                    rows={3}
                    placeholder="Tell me about your team, system goals, or timeline..."
                  ></textarea>
                </label>
                <div className="fr">
                  <span>Response time under 48h</span>
                  <button className="bt rl" type="submit">
                    Send Message
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
      <footer>
        <div className="w">
          <div className="big sp" id="bg">
            Jaiyanth B
          </div>
          <div className="fl">
            <span>Jaiyanth B — AI &amp; Full-Stack Engineer</span>
            <span>
              <a data-w className="rl" href="#about">
                About
              </a>
              <a data-w className="rl" href="#work">
                Work
              </a>
              <a data-w className="rl" href="#contact">
                Contact
              </a>
            </span>
            <span className="g">
              © 2026 Jaiyanth B. All rights reserved.{' '}
              <a href="#top" data-w>
                Back to top ↑
              </a>
              <a
                href="https://github.com/jaiyan-th/Jaiyanth-s-Portfolio"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub Repo ↗
              </a>
            </span>
          </div>
        </div>
      </footer>
    </>
  );
}
